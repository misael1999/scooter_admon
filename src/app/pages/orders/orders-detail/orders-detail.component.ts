import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  order;
  orderDetails;
  loadingOrder: boolean;

  constructor(
    private orderService: OrdersService,
    public dialogRef: MatDialogRef<OrdersDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.orderId) {
      this.getOrder(data.orderId);
    } else {
      this.order = data.order;
      this.orderDetails = data.order.details;
    }

  }

  ngOnInit(): void {
  }

  getOrder(orderId) {
    this.loadingOrder = true;
    this.orderService.getOrderById(orderId)
      .subscribe((data: any) => {
        this.order = data;
        this.orderDetails = data.details;
        this.loadingOrder = false;

      }, error => {
        this.loadingOrder = false;
        alert("Error al obtener detalles de la orden");
      });
  } 

}
