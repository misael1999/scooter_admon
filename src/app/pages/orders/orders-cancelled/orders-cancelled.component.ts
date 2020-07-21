import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders-cancelled',
  templateUrl: './orders-cancelled.component.html',
  styleUrls: ['./orders-cancelled.component.scss']
})
export class OrdersCancelledComponent implements OnInit {
// MatPaginator Inputs
length = 100;
pageSize = 15;
pageSizeOptions: number[] = [5, 10, 25, 100];
// MatPaginator Output
pageEvent: PageEvent;

// Parametros para el paginado
params = { limit: 15, offset: 0, search: '', order_status : '7,8' };
orders: Array<any> = [];
loadingOrders: boolean;
liveData$: Subscription;

constructor(private ordersService: OrdersService,
            private dialog: MatDialog, private webSocketService: WebSocketService) { }

ngOnInit(): void {
  this.getOrders();
}

getOrders() {
  this.loadingOrders = true;
  this.ordersService.getOrders(this.params)
    .subscribe((data: any) => {
      this.orders = data.results;
      this.loadingOrders = false;
      this.length = data.count;
    }, error => {
      this.loadingOrders = false;
    });
}

searchBy(value: string) {
  this.params.search = value;
/*     if (value === '') {
    return;
  } */
  this.getOrders();
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

// ======= PAGINADOR ========
getPages(e): PageEvent {
  if (this.orders.length === 0) {
    this.pageSize = 15;
    return;
  }
  this.params.limit = e.pageSize;
  this.params.offset = this.params.limit * e.pageIndex;
  this.getOrders();
}


}

