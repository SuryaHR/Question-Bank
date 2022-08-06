package com.questionbank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.questionbank.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>  {

}
