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
  params = { limit: 25, offset: 0, search: '', ordering: '', in_process: true };
  orders: Array<any> = [];
  loadingOrders: boolean;
  liveData$: Subscription;

  constructor(private ordersService: OrdersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrders();
  }

  openDialogDetailProducts(details) {
    this.dialog.open(OrdersDetailComponent, {
      width: '500px',
      data: { details }
    });
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



  openDialogAssignDelivery(orderId) {
    /* const dialogref = this.dialog.open(AssignDeliveryDialogComponent, {
      disableClose: true,
      width: '60%',
      minHeight: '500px',
      minWidth: '350px',
      data: {orderId}
    });
 
    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getOrders();
      }
    }); */
  }

  openDialogRejectOrder(orderId) {
    /*  const dialogref = this.dialog.open(RejectOrderDialogComponent, {
       disableClose: true,
       width: '40%',
       minHeight: '300px',
       minWidth: '300px',
       data: {orderId}
     });
  
     dialogref.afterClosed().subscribe(data => {
       if (data) {
         this.getOrders();
       }
     }); */
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

