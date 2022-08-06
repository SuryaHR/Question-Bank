package com.questionbank.service;



import java.util.List;

import com.questionbank.domain.Category;
import com.questionbank.domain.Question;


public interface QuestionBankService {

	Question saveQuestions(Question questionList);

//	List<Question> getQuestionDetails(long id);

	Category saveCategoryDetails(Category categoryList);

	Question getQuestionDetail(long id);
	
	List<Question> getQuestionDetails(String categoryName);

	void deleteQuestion(long id);

	List<Category> getCategoryDetails();

	String deleteCategoryDetails(long id);

	String updateQuestionDetails(Question questionList);

}
