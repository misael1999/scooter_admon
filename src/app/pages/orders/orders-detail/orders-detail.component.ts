import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      console.log(this.order);
      console.log(this.orderDetails);
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

        console.log(this.order);
        console.log(this.orderDetails);

        this.loadingOrder = false;
      }, error => {
        this.loadingOrder = false;
        alert('Error al obtener detalles de la orden');
      });
  }


  openDirection(addres) {
    window.open(`https://maps.google.com/?q=${addres.coordinates[1]},${addres.coordinates[0]}`, '_blank');
  }
}
