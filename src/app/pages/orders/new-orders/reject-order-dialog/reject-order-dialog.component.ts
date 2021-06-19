import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationForms } from 'src/app/utils/validations-forms';
export interface DialogData {
  orderId: number;
}
@Component({
  selector: 'app-reject-order-dialog',
  templateUrl: './reject-order-dialog.component.html',
  styleUrls: ['./reject-order-dialog.component.scss']
})
export class RejectOrderDialogComponent extends ValidationForms implements OnInit {
  rejectForm: FormGroup;
  orderId: number;
  loadingSave: boolean;

  constructor(public dialogRef: MatDialogRef<RejectOrderDialogComponent>,
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
    this.orderService.rejectOrder(this.orderId, this.rejectForm.value)
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
