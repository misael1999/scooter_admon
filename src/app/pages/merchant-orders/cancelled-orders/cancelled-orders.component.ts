import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, catchError, tap, retryWhen, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailOrdersComponent } from '../detail-orders/detail-orders.component';

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.scss']
})
export class CancelledOrdersComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', order_status: '7,8,17', ordering: '', is_order_to_merchant: true };
  orders: Array<any> = [];
  loadingOrders: boolean;
  loadingAcceptOrder: boolean;

  constructor(private ordersService: OrdersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrders();
  }

  openDialogDetailProducts(details) {
    this.dialog.open(DetailOrdersComponent, {
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