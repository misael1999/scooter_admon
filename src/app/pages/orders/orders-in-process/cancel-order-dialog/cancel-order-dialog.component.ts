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
  selector: 'app-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./cancel-order-dialog.component.scss']
})
export class CancelOrderDialogComponent extends ValidationForms implements OnInit {

  rejectForm: FormGroup;
  orderId: number;
  loadingSave: boolean;

  constructor(public dialogRef: MatDialogRef<CancelOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private orderService: OrdersService, private snackBar: MatSnackBar,
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
      return true;
    }
    this.orderService.cancelOrder(this.orderId, this.rejectForm.value)
      .subscribe((data: any) => {
        this.loadingSave = false;
        this.showSwalMessage(data.message);
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        this.loadingSave = false;
      });
  }


  buildRejectForm() {
    this.rejectForm = this.formBuilder.group({
      reason_rejection: [null, Validators.required]
    });
  }


}
