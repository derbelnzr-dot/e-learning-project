package com.elearning.backend.security.oauth2;

import com.elearning.backend.entity.User;
import com.elearning.backend.exception.BusinessException;
import com.elearning.backend.repository.UserRepository;
import com.elearning.backend.security.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Value("#{'${app.oauth2.authorized-redirect-uris}'.split(',')}")
    private List<String> authorizedRedirectUris;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = (OAuth2User) oauthToken.getPrincipal();

        String email = (String) oAuth2User.getAttributes().get("email");
        if (email == null) {
            throw new IOException("Email not found from OAuth2 provider");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("User not found after OAuth2 authentication"));

        String accessToken = jwtTokenProvider.generateAccessToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        String targetUrl = determineTargetUrl(request, accessToken, refreshToken);

        if (response.isCommitted()) {
            return;
        }

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private String determineTargetUrl(HttpServletRequest request,
                                      String accessToken,
                                      String refreshToken) {
        String redirectUri = request.getParameter("redirect_uri");

        if (redirectUri != null && isAuthorizedRedirectUri(redirectUri)) {
            return UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("access_token", accessToken)
                    .queryParam("refresh_token", refreshToken)
                    .build().toUriString();
        }

        String defaultUri = authorizedRedirectUris.isEmpty()
                ? "http://localhost:4200/oauth2/redirect"
                : authorizedRedirectUris.get(0);

        return UriComponentsBuilder.fromUriString(defaultUri)
                .queryParam("access_token", accessToken)
                .queryParam("refresh_token", refreshToken)
                .build().toUriString();
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        return authorizedRedirectUris.stream().anyMatch(uri::startsWith);
    }
}
