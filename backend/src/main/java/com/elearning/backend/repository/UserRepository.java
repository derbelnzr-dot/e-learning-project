package com.elearning.backend.repository;

import com.elearning.backend.entity.AuthProvider;
import com.elearning.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndAuthProvider(String email, AuthProvider authProvider);

    Boolean existsByEmail(String email);

    Optional<User> findByProviderIdAndAuthProvider(String providerId, AuthProvider authProvider);
}
