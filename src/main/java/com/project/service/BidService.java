package com.project.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.Bid;
import com.project.model.Project;
import com.project.model.Role;
import com.project.model.User;
import com.project.repository.BidRepository;
import com.project.repository.ProjectRepository;
import com.project.repository.UserRepository;

@Service
public class BidService {

	@Autowired
	private BidRepository bidRepo;
	
    @Autowired
    private UserRepository user;
	
	@Autowired
	private ProjectRepository pRepo;
	
	
	// it will add a new bid in repo
	public String placeBid(Bid bid, int pid) {
	    Project project = pRepo.findById(pid).get(); 
	    User u = user.findByEmail(bid.getFreelancerEmail());
	    if (user == null) {
	        return "User not found";
	    }
	    
	    if(u.getRole() != Role.FREELANCER) {
	        return "Only freelancers can place bids";
	    } 
	    
	    
	    if (project.getStatus().equals("COMPLETED")) {
	        return "Project already completed. Cannot place bid.";
	    }

	   
	    if (project.getStatus().equals("IN_PROGRESS")) {
	        return "Project already assigned. Cannot place bid.";
	    }
	    	bid.setProject(project); 
	  	    bid.setStatus("PENDING");
	  	    bidRepo.save(bid);
	    
	  	    return "Bid Placed Successfully";
	}
	
	
	// it will accept a bid 
	public String acceptBid(int bid) {
	 Optional<Bid> bidopt =	bidRepo.findById(bid);
	 if(bidopt !=null) {
		   Bid bidsel = bidopt.get();
		   Project p = bidsel.getProject(); // get project from this bid
		   List<Bid> list = bidRepo.findByProject_Pid(p.getPid()); // get all bid for this project
		   for(Bid el : list) {
			   if (bid == el.getId()) {
				   el.setStatus("Accept");
			   }else {
				   el.setStatus("Reject");
			   }
			    bidRepo.save(el);
		   }
				p.setStatus("IN_PROGRESS");
				p.setAssignedFreelancer(bidsel.getFreelancerEmail());
				pRepo.save(p);
	 }
	 return "not found";
	}
	
	
	//it will give the all the bid
	public List<Bid> getAllBid(int pid) {
	   return bidRepo.findByProject_Pid(pid);
	 
	}
	
	//delete bid
	public String deleteBid(int id) {
	    if(bidRepo.existsById(id)) {
	        bidRepo.deleteById(id);
	        return "Bid Deleted";
	    }
	    return "Bid Not Found";
	}
	
	
	public String rejectBid(int id) {
	    Optional<Bid> bidopt = bidRepo.findById(id);

	    if (bidopt.isPresent()) {
	        Bid b = bidopt.get();
	        b.setStatus("Reject");
	        bidRepo.save(b);
	        return "Bid Rejected";
	    }
	    return "Bid Not Found";
	}
	
	
	public List<Bid> getAllBids() {
	    return bidRepo.findAll();
	}
	
	public List<Bid> getMyBids(String email) {
	    return bidRepo.findByFreelancerEmail(email);
	}
	
	public List<Bid> getAllBids1() {
	    return bidRepo.findAll();
	}
	
	public String deleteBid1(int id) {
	    if (bidRepo.existsById(id)) {
	        bidRepo.deleteById(id);
	        return "Bid Deleted Successfully";
	    }
	    return "Bid Not Found";
	}
}
