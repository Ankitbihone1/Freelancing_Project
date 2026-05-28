package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.User;
import com.project.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already exists";
        }
        userRepository.save(user);       
        return "User Registered Successfully";
    }
    
    
    
    public User login(String email, String password) {

        User u = userRepository.findByEmail(email);

        if (u != null && u.getPassword().equals(password)) {
            return u;
        }

        return null;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public String deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return "User Deleted Successfully";
        }
        return "User Not Found";
    }
}