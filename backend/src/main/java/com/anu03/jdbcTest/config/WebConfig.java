package com.anu03.jdbcTest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Alle Endpunkte erlauben
                        .allowedOrigins("http://localhost:3000") // Spezifizierte Frontend-URL erlauben
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Erlaubte HTTP-Methoden
//                .allowedHeaders("*");
            }
        };
    }
}
