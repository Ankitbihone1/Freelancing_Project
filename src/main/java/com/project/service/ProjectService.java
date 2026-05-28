package com.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.model.Project;
import com.project.model.Role;
import com.project.model.User;
import com.project.repository.ProjectRepository;
import com.project.repository.UserRepository;

@Service
public class ProjectService {
    
	@Autowired
	private ProjectRepository prepo;
	
	@Autowired
	private UserRepository  user;
	
	
	
	
	//add project in repo
	public String createProject(Project project) {
		if(project == null) {
		 return "project not add";
		}
		User u = user.findByEmail(project.getClientEmail());
		if (user == null) {
		    return "User not found";
		}
		if(u.getRole() != Role.CLIENT) {
			return "Only client can create project";
		}
		project.setStatus("Open");
		prepo.save(project);
		return "Project Created";
	}
	
	
	//show all the project
	public List<Project> viewAllProject(){
		return prepo.findAll();
	}
	
	
	//update status
	public String completeProject( int projectid) {
	  Optional<Project> p =prepo.findById(projectid);
	
	  if(!p.isEmpty()) {
		  Project project = p.get();
		  
	  if (!project.getStatus().equals("IN_PROGRESS")) {
          return "Project is not in progress";
	  }
		  project.setStatus("Completed"); 
		  prepo.save(project);
		  
	  }
	  return "Project completed successfully";
	}
	
	
	//show client specific project
	public List<Project> specificProject(String email) {
		return  prepo.findByClientEmail(email);
	}
	
	//delete project
	public String deleteProject(int id) {
		Optional<User> u = user.findById(id);
		
		  User u1 =	u.get();
			if(u1.getRole() != Role.CLIENT) {
		        return "Only client can delete project";
			}
	    if(prepo.existsById(id)) {
	        prepo.deleteById(id);   
	        return "Project Deleted";
	    }
	    
	    return "Project Not Found";
	}
	
	public List<Project> getAllProjects() {
	    return prepo.findAll();
	}
	
	public String deleteProjectAdmin(int id) {
	    if (prepo.existsById(id)) {
	        prepo.deleteById(id);
	        return "Project Deleted Successfully";
	    }
	    return "Project Not Found";
	}
}
