package com.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.User;

import com.project.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/register")
	public String registerUser(@RequestBody User user) {
		return userService.register(user);
	}
	
	@PostMapping("/login")
	public Map<String, Object> loginUser(@RequestBody User user) {

	    User u = userService.login(user.getEmail(), user.getPassword());

	    Map<String, Object> res = new HashMap<>();

	    if (u != null) {
	        res.put("message", "Login Successful");
	        res.put("role", u.getRole());
	        res.put("email", u.getEmail());
	    } else {
	        res.put("message", "Invalid Credentials");
	    }

	    return res;
	}
	
	@DeleteMapping("/admin/users/delete/{id}")
	public String deleteUser(@PathVariable int id) {
	    return userService.deleteUser(id);
	}
	
	@GetMapping("/admin/users")
	public List<User> getAllUsers() {
	    return userService.getAllUsers();
	}
	
	
}
