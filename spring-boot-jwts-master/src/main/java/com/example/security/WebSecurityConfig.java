package com.example.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	System.out.println("inside WebSecurityConfig.configure()");
        http.csrf().disable().authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "**").permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .anyRequest().authenticated()
                .and()
                // We filter the api/login requests
                .addFilterBefore(new JWTLoginFilter("/login", "POST", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class);
      //  http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Create a default account
        auth.inMemoryAuthentication()
                .withUser("admin")
                .password("admin")
                .roles("ADMIN");
    }
}