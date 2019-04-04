package com.example.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.pojo.ErrorMessage;
import com.example.pojo.Member;
import com.example.repo.MemberRepository;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController

public class MemberController {
	
	@Autowired
	private MemberRepository repository;
	
	
	@RequestMapping(value = "/members", method = RequestMethod.POST)
	public Object addMemberData(@RequestBody Member member ) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{
		
		System.out.println("About add Member: "+member);
		//preparedata.ClassSpecifier(buildnumber,DBType,DBServerHostName, DBServerPortNumber,DataBaseName, DB_Username,DB_Password,SchemaNames,XMLFile);
		
		if(repository.findByMobileNumber(member.getMobileNumber())==null)
		{
			Member retOb = repository.save(member);
			System.out.println("MemberAdded: "+member);
			return retOb;
		}
		else
		{
			System.out.println("Member Already Exist with mobile number: "+member.getMobileNumber());
			return new ResponseEntity<ErrorMessage>(ErrorMessage.getIns("Member Already Exist with mobile number: "+member.getMobileNumber()), HttpStatus.CONFLICT);

		}
	}
	
	@RequestMapping(value = "/members/{id}", method = RequestMethod.PUT)
	public Object updateMemberData(@RequestBody Member member, @PathVariable("id") String id) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{

		member.id = id;		
		Member dbMember = repository.findById(id);
		if(dbMember!=null)
		{
			if(!dbMember.getMobileNumber().equals(member.getMobileNumber()))
			{
				if(repository.findByMobileNumber(member.getMobileNumber())!=null)				
				{
					System.out.println("Member Already Exist with mobile number: "+member.getMobileNumber());
					return new ResponseEntity<ErrorMessage>(ErrorMessage.getIns("Member Already Exist with mobile number: "+member.getMobileNumber()), HttpStatus.CONFLICT);

				}
			}
			
			Member retOb = repository.save(member);
			System.out.println("MemberUpdated: "+member);
			return retOb;
		}
		else
		{
			System.out.println("Member Already Exist with mobile number: "+member.getMobileNumber());
			return new ResponseEntity<ErrorMessage>(ErrorMessage.getIns("Can't find Member  with ID: "+member.id), HttpStatus.NOT_FOUND);
		}		
	}
	

	
	@RequestMapping(value = "/members/{id}", method = RequestMethod.DELETE)
	public Object deleteMemberData(@PathVariable("id") String id) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{

		System.out.println("Member deleted -id: "+id);
		 repository.delete(repository.findById(id));
		 return "{\"status\": \"success\"}";
		 
	}
	
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public Object getAllMemberData() throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{
		
		System.out.println("GettingAllMembers");
		List<Member> all = repository.findAll();
		System.out.println(all);
		return all;		
	}
	
	@RequestMapping(value = "/members/{id}", method = RequestMethod.GET)
	public Object getMemberData(@PathVariable("id") String id) throws FileNotFoundException, IOException, InvalidFormatException, org.apache.poi.openxml4j.exceptions.InvalidFormatException{

		System.out.println("Getting Member data -id: "+id);
		return repository.findById(id);
	}
}
