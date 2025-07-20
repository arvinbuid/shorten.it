package com.url.shorten.it.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthResponseDTO {
    private String token;
}