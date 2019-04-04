package com.example.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.pojo.Member;

public interface MemberRepository extends MongoRepository<Member, String> {

	public Member findById(String id);
	public Member findByMobileNumber(String mobileNumber);
    public List<Member> findByName(String name);
    
}
