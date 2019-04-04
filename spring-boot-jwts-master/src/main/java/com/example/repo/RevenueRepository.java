package com.example.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.pojo.Revenue;

public interface RevenueRepository extends MongoRepository<Revenue, String> {

	public Revenue findById(String id);
	public Revenue findByType(String type);
    
}
