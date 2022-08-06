import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModal } from './modal/category-modal';
import { QuestionTableModal } from './modal/question-table';

const baseUrl = "http://localhost:8080/api/questions";

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {

  isVisitedHome: boolean = false;

  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { }


  getQuestions(categoryName: string){
     return this.http.get(baseUrl + '/getQuestions?categoryName=' + categoryName);
  }

  saveCategory(categoryList: CategoryModal){
    console.log("Service" , categoryList)
    return this.http.post(baseUrl + '/saveCategory',JSON.stringify(categoryList) , this.headers);
  }

  getCategories(){
    return this.http.get(baseUrl + '/getCategories');
  }

  saveQuestion(questionList: QuestionTableModal){
    console.log("service" , questionList);
    return this.http.post(baseUrl + '/saveQuestion' , JSON.stringify(questionList) , this.headers);
  }

  editQuestion(questionList: QuestionTableModal){
    return this.http.put(baseUrl + '/UpdateQuestion', JSON.stringify(questionList) , this.headers);
  }

  deleteQuestion(id: number){
    return this.http.delete(baseUrl + '/deleteQuestion?id=' + id);
  }

  deleteCategory(id: number){
    return this.http.delete(baseUrl + '/deleteCategory?id=' + id);
  }

 


}


