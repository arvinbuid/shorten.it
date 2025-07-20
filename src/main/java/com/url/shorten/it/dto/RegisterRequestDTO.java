package com.url.shorten.it.dto;

import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequestDTO {
    private String username;
    private String email;
    private String password;
    private Set<String> role;
}