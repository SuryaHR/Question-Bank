package com.questionbank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.questionbank.domain.Category;
import com.questionbank.domain.Question;

@Repository
public interface QuestionBankRepository extends JpaRepository<Question, Long> {

	String save(Optional<Question> question);

	List<Question> findByCategoryName(String categoryName);

//	List<Question> findByQuestionId(long id);


}
