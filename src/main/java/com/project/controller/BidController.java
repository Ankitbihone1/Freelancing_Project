package com.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.Bid;
import com.project.model.Project;
import com.project.service.BidService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/bid")
public class BidController {
	
	@Autowired
	private BidService bidser;
	
	@PostMapping("/place/{pid}")
	public String placeBid(@RequestBody Bid bid ,@PathVariable int pid) {
		return  bidser.placeBid(bid,pid);
	}
	
	@PutMapping("/accept/{id}")
	public String acceptBid(@PathVariable int id) {
		return bidser.acceptBid(id);
	}
	
	@GetMapping("/allbid/{pid}")
	public List<Bid> viewBid(@PathVariable int pid){
		return bidser.getAllBid(pid);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteBid(@PathVariable int id) {
	    return bidser.deleteBid(id);
	}
	
	@PutMapping("/reject/{id}")
	public String rejectBid(@PathVariable int id) {
	    return bidser.rejectBid(id);
	}
	
	@GetMapping("/all")
	public List<Bid> getAllBids() {
	    return bidser.getAllBids();
	}
	
	@GetMapping("/my/{email}")
	public List<Bid> getMyBids(@PathVariable String email) {
	    return bidser.getMyBids(email);
	}
	
	@GetMapping("/admin/bids")
	public List<Bid> getAllBids1() {
	    return bidser.getAllBids1();
	}
	
	@DeleteMapping("/admin/bids/delete/{id}")
	public String deleteBid1(@PathVariable int id) {
	    return bidser.deleteBid1(id);
	}
	
}
