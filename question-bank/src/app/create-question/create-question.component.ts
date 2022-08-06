import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { QuestionTableModal } from '../modal/question-table';
import { QuestionBankService } from '../question-bank.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  questionData: string = "";
  questionDetails: QuestionTableModal = new QuestionTableModal();
  totalScore = 0;
  negativeScore = 0;
  questionText: string = '';
  categoryName: string = '';
  dataType: string = '';
  sequence: string = '';
  isActive: boolean = false;
  objId: number = 0;
  edit: boolean = false;
  id: number = 0;
  category: string = "";
  questionsList: QuestionTableModal[] = [] ;

  constructor(private router: Router,
    private qbService: QuestionBankService,
    private appComponent: AppComponent,
    private route: ActivatedRoute) { }

    form: FormGroup = new FormGroup({
      totalScore: new FormControl(''),
      negativeScore: new FormControl('')
    })

    
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.questionData = params['questionText'];
      this.category = params['category'];
      this.totalScore = params['totalScore'];
      this.negativeScore = params['negativeScore'];
      if(this.id){
        this.edit = true;
      }else{
        this.edit = false;
      }
    });

  }

  back(){
    history.back();
  }

  public CkeditorConfig = {
    extraPlugins: 'mathjax,autogrow',
    mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
    toolbar: [
      { name: 'document', items: ['Source'] },
      { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
      { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
      { name: 'forms', items: ['Checkbox', 'Radio', 'TextField', 'Textarea'] },
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-'] },
      '/',
      {
        name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote',
          '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
      },
      { name: 'insert', items: ['Mathjax', 'Table', 'HorizontalRule', 'SpecialChar'] },
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'links', items: ['Link', 'Unlink', '-', 'TrackingLink'] }
    ]
  };

  addQuestion(questionList: QuestionTableModal){
    this.qbService.saveQuestion(questionList).subscribe((data) => {
      this.appComponent.setSuccessMessage("Added Successfully");
    })
    
  }

  onSubmit(){
    this.questionDetails.questionText = this.questionData;
    this.questionDetails.categoryName = this.category;
    this.questionDetails.dataType = this.dataType;
    this.questionDetails.negativeScore = this.negativeScore;
    this.questionDetails.score = this.totalScore;
    this.questionDetails.sequence = this.sequence;
    this.questionDetails.isActive = this.isActive;
    this.addQuestion(this.questionDetails)
    this.router.navigate(['/table'],
    {
      queryParams: {
        category: this.questionDetails.categoryName
      }
    })
  }

  updateQuestion(id: number , questionData: string , totalScore: number , negativeScore: number){
    this.questionDetails.id = id;
    this.questionDetails.questionText = questionData;
    this.questionDetails.categoryName = this.category;
    this.questionDetails.dataType = this.dataType;
    this.questionDetails.negativeScore = negativeScore;
    this.questionDetails.score = totalScore;
    this.questionDetails.sequence = this.sequence;
    this.questionDetails.isActive = this.isActive;
    this.qbService.editQuestion(this.questionDetails).subscribe((data) => {
      this.appComponent.setSuccessMessage("Updated Successfully");
    });
    this.router.navigate(['/table'],
    {
      queryParams: {
        id: id,
        category: this.questionDetails.categoryName
      }
    })
  }

  resetQuestion(){
    this.form.reset();
  }

}
