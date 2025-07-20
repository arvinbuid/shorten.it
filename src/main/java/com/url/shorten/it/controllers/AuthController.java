package com.url.shorten.it.controllers;

import com.url.shorten.it.dto.LoginRequestDTO;
import com.url.shorten.it.dto.RegisterRequestDTO;
import com.url.shorten.it.models.User;
import com.url.shorten.it.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDTO registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setRole("USER_ROLE");

        userService.registerUser(user);
        return ResponseEntity.ok("User created successfully.");
    }
}