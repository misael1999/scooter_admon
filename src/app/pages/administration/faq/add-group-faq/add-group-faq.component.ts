import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FaqService } from 'src/app/services/faq.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-add-group-faq',
  templateUrl: './add-group-faq.component.html',
  styleUrls: ['./add-group-faq.component.scss']
})
export class AddGroupFaqComponent extends ValidationForms implements OnInit {
  groupForm: FormGroup;
  loadingSave: boolean;

  constructor(private fb: FormBuilder, private faqService: FaqService, private dialogRef: MatDialogRef<AddGroupFaqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
  }


  createGroup() {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }
    const group = this.groupForm.value;
    this.loadingSave = true;
    this.addGroup(group)
  }

  addGroup(group) {
    this.faqService.createGroup(group)
      .subscribe((data) => {
        this.showSwalMessage('Grupo Agregado Correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        this.loadingSave = false;
      });
  }

  buildForm() {
    this.groupForm = this.fb.group(
      {
        name: [null, Validators.required]
      }
    );
  }
}



