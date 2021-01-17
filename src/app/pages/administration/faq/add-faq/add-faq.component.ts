import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { FaqService } from '../../../../services/faq.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent extends ValidationForms implements OnInit {
  addFaq: FormGroup;
  faq: any;
  groups: any;
  loadingSave: boolean;

  constructor(private fb: FormBuilder, private faqService: FaqService, dialogRef: MatDialogRef<AddFaqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit(): void {
    this.getGroups();
  }


  createFaq() {

  }

  getGroups(){
    this.faqService.getGroup()
    .subscribe((data: any) => {
      this.groups = data;
      console.log(this.groups);
    });
  }


  buildForm() {
    this.faq = this.fb.group(
      {
        title: [null, Validators.required],
        answer: [null, Validators.required],
        id: [null, Validators.required],

      }
    );
  }



}
