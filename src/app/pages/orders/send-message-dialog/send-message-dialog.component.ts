import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { SupportService } from '../../../services/support.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.scss']
})
export class SendMessageDialogComponent extends ValidationForms implements OnInit {
  supportForm: FormGroup;
  loadingSave: boolean;
  idStation: number;
  idOrder: number;

  constructor(private fb: FormBuilder,
              private supportService: SupportService,
              private router: Router,
              public dialogRef: MatDialogRef<SendMessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super();
    console.log(data.order);
    this.idStation = data.order.station_object.id;
    this.idOrder = data.order.id;
    console.log(this.idStation);
  }

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
    const value = this.supportForm.value;
    // Send message or create support
    const data = {
      text: value.text,
      support_type: 1,
      is_to_order: true,
      is_to_help: false,
      issue: 'Seguimiento de pedido',
      is_to_delivery_man: false,
      // delivery_man: '',
      station: 1,
      order: this.idOrder
    };
    console.log(data);
    this.supportService.openConversationWithClient(this.idStation, data)
      .subscribe((resp: any) => {
        this.showSwalMessage('Mensaje enviado', 'success');
        this.dialogRef.close(true);
        this.router.navigateByUrl('/support');
      }, error => {
        this.showSwalMessage('Error', 'error');

      });
  }




}
