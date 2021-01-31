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
  faqForm: FormGroup;
  faq: any;
  loadingSave: boolean;
  groups: Array<any> = [];
  groupSelected;

  constructor(private fb: FormBuilder, private faqService: FaqService, private dialogRef: MatDialogRef<AddFaqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    if (data.faq) {
      this.faq = data.faq;
      this.buildUpdateForm(this.faq);
    } else {
      this.buildForm();
    }
  }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.faqService.getGroup()
      .subscribe((data: any) => {
        this.groups = data;
        console.log(this.groups);
      });
  }



  createFaq() {
    if (this.faqForm.invalid) {
      this.faqForm.markAllAsTouched();
      return;
    }
    const faq = this.faqForm.value;
    this.loadingSave = true;
    if (this.faq) {
      this.updateFaq(this.faq.id, faq);
    } else {
      this.addFaq(faq);
    }
  }


  addFaq(faq) {
    this.faqService.createFaq(faq)
      .subscribe((data) => {
        this.showSwalMessage('Pregunta Agregada Correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage(error.errors.message);
        this.loadingSave = false;
      });
  }
  buildForm() {
    this.faqForm = this.fb.group(
      {
        title: [null, Validators.required],
        answer: [null, Validators.required],
        group: [null, Validators.required],
      }
    );
  }



  updateFaq(faqId, faq) {
    this.faqService.editFaq(faqId, faq)
      .subscribe((data) => {
        this.showSwalMessage('Pregunta Actualizada Correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage('Opps.. Ubo un problema al actualizar')
        this.loadingSave = false;
      })
  }
  buildUpdateForm(faq) {
    this.faqForm = this.fb.group(
      {
        title: [faq.title, Validators.required],
        answer: [faq.answer, Validators.required],
        group: [faq.group_id, Validators.required],
      }
    );
  }
}
