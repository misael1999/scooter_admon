import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';
import { ReasignOrderComponent } from './reasign-order/reasign-order.component';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';
import { SendMessageDialogComponent } from '../send-message-dialog/send-message-dialog.component';
import { CancelOrderMerchantComponent } from './cancel-order-merchant/cancel-order-merchant.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders-in-process',
  templateUrl: './orders-in-process.component.html',
  styleUrls: ['./orders-in-process.component.scss']
})
export class OrdersInProcessComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  pageEvent: PageEvent;
  // params = { limit: 25, offset: 0, search: '', ordering: '', in_process: true };
  orders: Array<any> = [];
  loadingOrders: boolean;
  liveData$: Subscription;


  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', order_status: '3,4,5,12,13,15,16', ordering: '', in_process: true };



  loadingAcceptOrder: boolean;
  loadingRejectOrder: boolean;

  constructor(private ordersService: OrdersService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getOrders();
  }


  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      width: '90%',
      data: { order }
    });
  }
  openDirection(addres) {
    console.log(addres);
    window.open(`https://maps.google.com/?q=${addres.coordinates[1]},${addres.coordinates[0]}`, '_blank');
  }


  getOrders() {
    this.loadingOrders = true;
    this.ordersService.getOrders(this.params)
      .subscribe((data: any) => {
        this.orders = data.results;
        console.log(this.orders);
        this.loadingOrders = false;
        this.length = data.count;
      }, error => {
        this.loadingOrders = false;
      });
  }

  endOrderMerchant(orderId) {
    this.loadingAcceptOrder = true;
    this.ordersService.endOrderMerchant(orderId, {})
      .subscribe((data: any) => {
        this.loadingAcceptOrder = false;
        this.snackBar.open('Pedido terminado', '', {
          duration: 4000,
          panelClass: 'main-snackbar'
        });
        this.getOrders();
      }, error => {
        this.loadingAcceptOrder = false;
        alert('Ha ocurrido un error al terminar el pedido');
      });
  }

  rejectOrderMerchant(orderId) {
    const dialogref = this.dialog.open(CancelOrderMerchantComponent, {
      disableClose: true,
      width: '40%',
      minHeight: '300px',
      minWidth: '300px',
      data: { orderId }
    });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getOrders();
      }
    });
  }

  openDialogCancelOrder(orderId) {
    const dialogref = this.dialog.open(CancelOrderDialogComponent, {
      disableClose: true,
      width: '40%',
      minHeight: '300px',
      minWidth: '300px',
      data: { orderId }
    });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getOrders();
      }
    });
  }

  openDialogReassignDelivery(order) {
    console.log(order);
    const dialogref = this.dialog.open(ReasignOrderComponent, {
      disableClose: true,
      width: '60%',
      minHeight: '500px',
      minWidth: '350px',
      data: { orderId: order.id, typeService: order.service_id }
    });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getOrders();
      }
    });
  }


  openDialogSendMessageOrder(order) {
    const dialogref = this.dialog.open(SendMessageDialogComponent, {
      disableClose: true,
      width: '30%',
      minHeight: '400px',
      minWidth: '350px',
      data: { order: order }
    });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getOrders();
      }
    });
  }

  searchBy(value: string) {
    this.params.search = value;
    this.getOrders();
  }


  orderingOrders(value: string) {
    this.params.ordering = value;
    this.getOrders();
  }


  getPages(e): PageEvent {
    if (this.orders.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getOrders();
  }


}

