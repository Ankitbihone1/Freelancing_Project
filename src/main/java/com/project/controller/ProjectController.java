package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.Project;
import com.project.service.ProjectService;

@RestController
@RequestMapping("api")
public class ProjectController {
	
	@Autowired
	ProjectService service;

	@PostMapping("/create")
	public String createProject(@RequestBody Project project) {
	  return  service.createProject(project);
	  
	}
	
	@GetMapping("/projects")
	public List<Project> viewProjects() {
		return service.viewAllProject();
	}
	
	@PutMapping("/complete/{pid}")
	public String completeProject(@PathVariable int pid) {
		return service.completeProject(pid);
	}
	
	
	@GetMapping("/client/project/{email}")
	public List<Project> getSpecific(@PathVariable String email) {
		return service.specificProject(email);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteProject(@PathVariable int id) {
	    return service.deleteProject(id);
	}
	
	@GetMapping("/admin/projects")
	public List<Project> getAllProjects() {
	    return service.getAllProjects();
	}
	
	@DeleteMapping("/admin/projects/delete/{id}")
	public String deleteProjectAdmin(@PathVariable int id) {
	    return service.deleteProjectAdmin(id);
	}
}

