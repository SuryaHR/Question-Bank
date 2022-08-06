package com.questionbank.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.questionbank.domain.Category;
import com.questionbank.domain.Question;
import com.questionbank.service.QuestionBankService;

@CrossOrigin(origins = "*" , maxAge = 3600 , allowedHeaders = "*")
@RestController
@RequestMapping("/api/questions")
public class QuestionBankEndpoint {
	
	@Autowired
	private QuestionBankService questionBankService;
	
	
	@PostMapping("/saveQuestion")
	public Question save(@RequestBody Question questionList){
		return questionBankService.saveQuestions(questionList);	
	}
	
	@GetMapping("/getQuestions")
	public ResponseEntity<List<Question>> getQuestions(@RequestParam("categoryName") String categoryName){
		return ResponseEntity.ok(questionBankService.getQuestionDetails(categoryName));
	}
	
	@PostMapping("/saveCategory")
	public Category saveCategory(@RequestBody Category categoryList) {
		return questionBankService.saveCategoryDetails(categoryList);
	}
	
	@GetMapping("/getQuestion")
	public ResponseEntity<Question> getQuestion(@RequestParam("id") long id){
		System.out.println(questionBankService.getQuestionDetail(id));
		return ResponseEntity.ok(questionBankService.getQuestionDetail(id));
	}
	
	@PutMapping("/UpdateQuestion")
	public String update(@RequestBody Question questionList){
		return questionBankService.updateQuestionDetails(questionList);	
	}
	
	@DeleteMapping("/deleteQuestion")
	public void delete(@RequestParam("id") long id){
	 questionBankService.deleteQuestion(id);	
	}
	
	@GetMapping("/getCategories")
	public ResponseEntity<List<Category>> getCategory(){
		return ResponseEntity.ok(questionBankService.getCategoryDetails());
	}
	
	@DeleteMapping("/deleteCategory")
	public String deleteCategory(@RequestParam("id") long id) {
		questionBankService.deleteCategoryDetails(id);
		return "Category deleted Successfully";
	}
}
