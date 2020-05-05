package com.european.controller;

import java.security.Principal;
import java.util.List;

import com.european.aop.SendEmail;
import com.european.exception.UserNotFoundException;
import com.european.model.User;
import com.european.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;


	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable String id) {
		logger.info("Searching for: " + id);
		User user = (User) userService.getUser(id.trim());
			return new ResponseEntity<User>(user,  HttpStatus.OK);
	}

	@SendEmail
	@RequestMapping(value = "/user/register", method = RequestMethod.POST)
	public  ResponseEntity<?> saveUser(@Valid @RequestBody User user) {
		logger.info("Register user: " + user);
		return new ResponseEntity<User>((User) userService.saveUser(user), HttpStatus.CREATED);
	}

}
