import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { DialogData } from '../assign-delivery-dialog/assign-delivery-dialog.component';

@Component({
  selector: 'app-reject-order-merchant',
  templateUrl: './reject-order-merchant.component.html',
  styleUrls: ['./reject-order-merchant.component.scss']
})
export class RejectOrderMerchantComponent extends ValidationForms implements OnInit {
  rejectForm: FormGroup;
  orderId: number;
  loadingSave: boolean;

  constructor(public dialogRef: MatDialogRef<RejectOrderMerchantComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
              private orderService: OrdersService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    super();
    this.orderId = data.orderId;
  }

  ngOnInit(): void {
    this.buildRejectForm();
  }

  rejectOrder() {
    if (this.rejectForm.invalid) {
      this.rejectForm.markAllAsTouched();
      return;
    }
    this.loadingSave = true;
    this.orderService.rejectOrderMerchant(this.orderId, this.rejectForm.value)
      .subscribe((data: any) => {
        this.loadingSave = false;
        this.showMessageSuccess(data.message);
        this.dialogRef.close(true);
      }, error => {
        this.showMessageError(error.errors.message);
        this.loadingSave = false;
      });
  }

  buildRejectForm() {
    this.rejectForm = this.formBuilder.group({
      reason_rejection: [null, Validators.required]
    });
  }

  showMessageSuccess(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['main-snackbar']
    });
  }

  showMessageError(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
