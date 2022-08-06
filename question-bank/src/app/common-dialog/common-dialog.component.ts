import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionBankService } from '../question-bank.service';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {

  category = "";
  // popupForm: FormGroup = new FormGroup();

  categoryOptions: string[] = ["Single-Correct", "Multi-Correct" , "Descriptive"];
  popupForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });
  categoryName = "";


  constructor(private dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private qbService: QuestionBankService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }

  saveDetails() {
    this.dialogRef.close({ flag: true, data: this.popupForm.value });
  }

  close() {
    this.dialogRef.close({flag: false});
  }

  reset() {
    this.popupForm.reset();
  }



}
