import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../orders/new-orders/assign-delivery-dialog/assign-delivery-dialog.component';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.scss']
})
export class DetailOrdersComponent implements OnInit {
  details: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<DetailOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordersService: OrdersService
  ) {
    this.details = data.details;
    console.log(this.details);
  }

  ngOnInit(): void {
  }





}
