package com.european;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.european")
public class SpringBootApplicationMain {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootApplicationMain.class, args);
	}

}