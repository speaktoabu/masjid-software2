package com.example.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.example.repo.MemberRepository;

@SpringBootApplication
@RestController
@EnableAutoConfiguration
@ComponentScan(basePackages= {"com.example.security","com.example.controller"})
@EnableMongoRepositories(basePackages= {"com.example.repo"})
public class DemoApplication {

	@Autowired
	private MemberRepository repository;
	
	@RequestMapping("/")
	String hello() {
		System.out.println("inside /");
		return "hello world";
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurerAdapter() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**").allowedOrigins("*").allowedHeaders("*");
	        }
	    };
	}
}
