import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.scss']
})
export class SendMessageDialogComponent extends ValidationForms implements OnInit {

  supportForm: FormGroup;
  loadingSave: boolean;

  constructor(private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.supportForm = this.fb.group({
      text: [null, Validators.required]
    });
  }

  async sendMessage() {
    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();
      return;
    }
    // Send message or create support
    const confirmationAction = await this.showMessageConfirm("De enviar el mensaje");
    if (!confirmationAction.value) return;
    this.showSwalMessage("Mensaje enviado", 'success');
  }

}
