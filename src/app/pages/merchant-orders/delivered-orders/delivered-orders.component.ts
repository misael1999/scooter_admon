import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDetailComponent } from '../../orders/orders-detail/orders-detail.component';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.scss']
})
export class DeliveredOrdersComponent implements OnInit {
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', order_status: '6', ordering: '', is_order_to_merchant: true };
  orders: Array<any> = [];
  loadingOrders: boolean;
  // liveData$: Subscription;
  loadingAcceptOrder: boolean;
  // loadingRejectOrder: boolean;

  constructor(private ordersService: OrdersService, private dialog: MatDialog) { }

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

  ngOnDestroy(): void {
  }

  getOrders() {
    this.loadingOrders = true;
    this.ordersService.getOrders(this.params)
      .subscribe((data: any) => {
        this.orders = data.results;
        this.loadingOrders = false;
        console.log(this.orders);
        this.length = data.count;
      }, error => {
        this.loadingOrders = false;
      });
  }

  searchBy(value: string) {
    this.params.search = value;
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