import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { HomeComponent } from './home/home.component';
import { QuestionTableComponent } from './question-table/question-table.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'category',
    component: CreateCategoryComponent
  },
  {
    path: 'question',
    component: CreateQuestionComponent
  },
  {
    path: 'table',
    component: QuestionTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
