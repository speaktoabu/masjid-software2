package com.example.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.pojo.Revenue;
import com.example.repo.RevenueRepository;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController

public class RevenueController {

	
	@Autowired
	private RevenueRepository revenueRepo;	
	
	
	@RequestMapping(value = "/revenue", method = RequestMethod.POST)	
	public Object addRevenueData(@RequestBody Revenue revenue ) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{
			
		System.out.println("About add Revenue: "+revenue);
		//preparedata.ClassSpecifier(buildnumber,DBType,DBServerHostName, DBServerPortNumber,DataBaseName, DB_Username,DB_Password,SchemaNames,XMLFile);
		
		Revenue revenueRet = revenueRepo.save(revenue);
		System.out.println("RevenueAdded: "+revenueRet);
		
		return revenueRet;
			
		}
	
	@RequestMapping(value = "/revenue/{id}", method = RequestMethod.PUT)
	public Object updateRevenueData(@RequestBody Revenue revenue, @PathVariable("id") String id) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{

		revenue.id = id;		
		Revenue revenueRet = revenueRepo.save(revenue);
		System.out.println("RevenueUpdated: "+revenueRet);
		return revenueRet;
	}
	
	@RequestMapping(value = "/revenue/{id}", method = RequestMethod.DELETE)
	public Object deleteRevenueData(@PathVariable("id") String id) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{

		System.out.println("Revenue deleted -id: "+id);
		revenueRepo.delete(revenueRepo.findById(id));
		 return "{\"status\": \"success\"}";
		 
	}
	
	@RequestMapping(value = "/revenue", method = RequestMethod.GET)
	public Object getAllRevenueData() throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{
		
		System.out.println("GettingAllRevenue");
		List<Revenue> all = revenueRepo.findAll();
		System.out.println(all);
		return all;		
	}
	
	@RequestMapping(value = "/revenue/{id}", method = RequestMethod.GET)
	public Object getRevenueData(@PathVariable("id") String id) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{

		System.out.println("Getting Revenue data -id: "+id);
		Revenue revenue = revenueRepo.findById(id);
		System.out.println(revenue);
		return revenue;
	}

	
	
	
	
	
}
