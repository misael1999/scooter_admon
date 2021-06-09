import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';
import { ReasignOrderComponent } from './reasign-order/reasign-order.component';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';
import { SendMessageDialogComponent } from '../send-message-dialog/send-message-dialog.component';
import { CancelOrderMerchantComponent } from './cancel-order-merchant/cancel-order-merchant.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-in-process',
  templateUrl: './orders-in-process.component.html',
  styleUrls: ['./orders-in-process.component.scss']
})
export class OrdersInProcessComponent implements OnInit {
  length = 100;
  pageIndex = 0;
  pageSize = 25;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  orders: Array<any> = [];
  loadingData: boolean;
  liveData$: Subscription;
  params = { limit: 25, offset: 0, search: '', ordering: '', in_process: true };
  searchText;
  loadingAcceptOrder: boolean;
  loadingRejectOrder: boolean;

  constructor(private ordersService: OrdersService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      height: '78%',
      width: '70%',
      data: { order }
    });
  }

  openDirection(addres) {
    console.log(addres);
    window.open(`https://maps.google.com/?q=${addres.coordinates[1]},${addres.coordinates[0]}`, '_blank');
  }

  getOrders() {
    this.loadingData = true;
    this.ordersService.getOrders(this.params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.orders = data.results;
        console.log(this.orders);
        this.length = data.count;
        this.ordersService.params = this.params;
        this.pageSize = this.params.limit;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingData = false;
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
      width: '400px',
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
    if (order.supports.length > 0) {
      this.router.navigateByUrl(`/support/${order.supports[0]}/messages`);
      return;
    }
    const dialogref = this.dialog.open(SendMessageDialogComponent, {
      disableClose: true,
      width: '450px',
      data: { order }
    });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getOrders();
      }
    });
  }

  searchBy(value: string) {
    this.params.search = value;
    this.ordersService.searchText = value;
    this.getOrders();
  }

  clearSearch() {
    this.params.search = '';
    this.ordersService.searchText = '';
    this.searchText = '';
    this.getOrders();
  }

  orderBy(value: string) {
    this.params.ordering = value;
    this.getOrders();
  }

  sendMessageByWhats(number) {
    window.open(`https://api.whatsapp.com/send?phone=52${number}`, '_blank');
  }

  getPages(e): PageEvent {
    if (this.orders.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getOrders();
  }
}

