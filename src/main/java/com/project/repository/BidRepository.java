package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.Bid;
import com.project.model.Project;

public interface BidRepository extends JpaRepository<Bid, Integer>{
	List<Bid> findByProject_Pid(int pid);
	List<Bid> findByFreelancerEmail(String email);
	List<Bid> findByProject(Project project);
	}
