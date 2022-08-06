import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { CategoryModal } from '../modal/category-modal';
import { QuestionBankService } from '../question-bank.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryList: CategoryModal[] = [];
  displayedColumns = ['serial' , 'category' , 'view'];
  dataSource = new MatTableDataSource<CategoryModal>();
  id: any;
  categoryName: string = "";


  constructor(private dialog: MatDialog,
    private qbService: QuestionBankService,
    private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getCategory();
  }

  create(id: string, categoryName: string){
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "600px",
      disableClose: true,
      data: {
        popupForm: "popupForm",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result["flag"]) {
        this.qbService.saveCategory(result["data"]).subscribe(
          (res) => {
            this.router.navigate(['/table'],
            {
              queryParams: {
                id:id,
                category: result.data.categoryName
              }
            })
          }
        );
      }
    });
  }

  getCategory(){
    this.qbService.getCategories().subscribe(details => {
      this.categoryList = <CategoryModal[]>details;
      this.dataSource = new MatTableDataSource<CategoryModal>(this.categoryList as CategoryModal[]);
    })
  }

  view(id: string , categoryName: string){
    this.router.navigate(['/table'],
    {
      queryParams:{
        id:id,
        category: categoryName
      }
    });
  }

}
