import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  orderId: number;
}

@Component({
  selector: 'app-assign-delivery-dialog',
  templateUrl: './assign-delivery-dialog.component.html',
  styleUrls: ['./assign-delivery-dialog.component.scss']
})
export class AssignDeliveryDialogComponent implements OnInit {

  orderId: number;
  deliveryMen: Array<any> = [];
  loading: boolean;
  loadingSave: boolean;
  selectedDelivery = null;
  params = {
    all: true
  };

  constructor(public dialogRef: MatDialogRef<AssignDeliveryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private orderService: OrdersService, private snackBar: MatSnackBar) {

                this.orderId = data.orderId;
                this.getNearestDeliveryMen(this.orderId);
  }

  ngOnInit(): void {
  }

  getNearestDeliveryMen(orderId: number) {
    this.loading = true;
    this.orderService.getNearestDeliveryMen({order_id: orderId}, this.params)
      .subscribe((data: any) => {
        this.deliveryMen = data.data;
        this.loading = false;
      }, error => {
        this.showMessageError(error.errors.message);
        this.loading = false;
      });
  }

  selectDelivery(deliveryId) {
    this.selectedDelivery = deliveryId;
  }

  selectFilter(value) {
    this.params.all = value;
    this.getNearestDeliveryMen(this.orderId);
    this.selectedDelivery = null;
  }

  assignDeliveryToOrder() {
    this.loadingSave = true;
    this.orderService.assignDeliveryToOrder(this.orderId, {delivery_man_id: this.selectedDelivery})
      .subscribe((data: any) => {
        this.loadingSave = false;
        this.showMessageSuccess(data.message);
        this.dialogRef.close(true);
      }, error => {
        this.loadingSave = false;
        console.log(error);
      });
  }

  showMessageSuccess(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
    });
  }

  showMessageError(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
    });
  }

}
