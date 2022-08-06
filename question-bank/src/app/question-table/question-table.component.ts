import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { QuestionTableModal } from '../modal/question-table';
import { QuestionBankService } from '../question-bank.service';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.css']
})
export class QuestionTableComponent implements OnInit {

  displayedColumns = ['serial' , 'questions','categoryName', 'edit' , 'delete'];
  dataSource = new MatTableDataSource<QuestionTableModal>();
  questionTableList: QuestionTableModal[] = [];
  questionDetails: QuestionTableModal = new QuestionTableModal();
  message: string = '';
  categoryName: string = "";
  category: string = "";

  constructor(private router: Router,
    private qbService: QuestionBankService,
    private appComponent: AppComponent,
    private route: ActivatedRoute) { }

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category']; 
    });
    this.getQuestion();
  }

  back() {
    history.back();
  }

  create(){
    this.router.navigate(['/question'],
    {
      queryParams: {
        category: this.category
      }
    });
  }

  edit(questionsList: QuestionTableModal){
    this.router.navigate(['/question'],
    {
      queryParams: {
        id: questionsList.id,
        category: questionsList.categoryName,
        questionText: questionsList.questionText,
        totalScore: questionsList.score,
        negativeScore: questionsList.negativeScore

      }
    });
  }

  delete(id: number){
    this.qbService.deleteQuestion(id).subscribe((data) => {
      this.getQuestion();
      this.appComponent.setSuccessMessage("Deleted Successfully");
    });
    this.getQuestion();
  }

  getQuestion(){
    this.qbService.getQuestions(this.category).subscribe(details => {
      this.questionTableList = <QuestionTableModal[]>details;
      this.dataSource = new MatTableDataSource<QuestionTableModal>(this.questionTableList as QuestionTableModal[]);
    })
  }
}
