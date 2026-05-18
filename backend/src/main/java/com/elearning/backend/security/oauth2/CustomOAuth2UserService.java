package com.elearning.backend.security.oauth2;

import com.elearning.backend.entity.AuthProvider;
import com.elearning.backend.entity.Role;
import com.elearning.backend.entity.User;
import com.elearning.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                registrationId,
                oAuth2User.getAttributes()
        );

        String email = oAuth2UserInfo.getEmail();
        if (email == null || email.isBlank()) {
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }

        AuthProvider authProvider = AuthProvider.valueOf(registrationId.toUpperCase());
        Optional<User> existingUser = userRepository.findByEmailAndAuthProvider(email, authProvider);

        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
            user.setName(oAuth2UserInfo.getName());
            user.setProfilePicture(oAuth2UserInfo.getProfilePicture());
            user = userRepository.save(user);
        } else {
            Optional<User> userWithSameEmail = userRepository.findByEmail(email);
            if (userWithSameEmail.isPresent()) {
                throw new OAuth2AuthenticationException(
                        "Email already registered with " + userWithSameEmail.get().getAuthProvider()
                );
            }

            user = User.builder()
                    .name(oAuth2UserInfo.getName())
                    .email(email)
                    .password(null)
                    .role(Role.USER)
                    .authProvider(authProvider)
                    .providerId(oAuth2UserInfo.getId())
                    .profilePicture(oAuth2UserInfo.getProfilePicture())
                    .emailVerified(true)
                    .build();
            user = userRepository.save(user);
        }

        return oAuth2User;
    }
}
