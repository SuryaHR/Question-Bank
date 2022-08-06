package com.questionbank.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.questionbank.domain.Category;
import com.questionbank.domain.Question;
import com.questionbank.exception.QuestionBankException;
import com.questionbank.repository.CategoryRepository;
import com.questionbank.repository.QuestionBankRepository;

@Service
public class QuestionBankServiceImp implements QuestionBankService {
	
	@Autowired
	private QuestionBankRepository questionBankRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;


	@Override
	public Question saveQuestions(Question questionList) {
		return questionBankRepository.save(questionList);
	}


	@Override
	public Category saveCategoryDetails(Category categoryList) {
		return categoryRepository.save(categoryList);	
	}


	@Override
	public List<Question> getQuestionDetails(String categoryName) {
		List<Question> questions = questionBankRepository.findByCategoryName(categoryName);
		return questions;
	}
	
	@Override
	public Question getQuestionDetail(long id) {
		Question question=null;
		Optional<Question> findById = questionBankRepository.findById(id);
		if(findById.isPresent()) {
			question = findById.get();
		}
		return question;
	}


	@Override
	public void deleteQuestion(long id) {
	 questionBankRepository.delete(questionBankRepository.findById(id).get());
	}


	@Override
	public List<Category> getCategoryDetails() {
		List<Category> categories = categoryRepository.findAll();
		return categories;
	}


	@Override
	public String deleteCategoryDetails(long id) {
		 categoryRepository.delete(categoryRepository.findById(id).get());
		 return "Category Deleted Successfully";
	}


	@Override
	public String updateQuestionDetails(Question questionList) {
		Assert.notNull(questionList, "Question Details Object Cannot be null");
		Assert.notNull(questionList.getId() , "Question Id Cannot be Null");
			if(questionBankRepository.existsById(questionList.getId())) {
				questionBankRepository.save(questionList);
				return "Updated Successfully";
			}
			return "Update not Successfull";
			
	}
	
}
