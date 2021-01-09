import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { PageEvent } from '@angular/material/paginator';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-cancelled',
  templateUrl: './orders-cancelled.component.html',
  styleUrls: ['./orders-cancelled.component.scss']
})
export class OrdersCancelledComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  pageEvent: PageEvent;
  params = { limit: 25, offset: 0, search: '', ordering: '', order_status: '7,8,17' };
  orders: Array<any> = [];
  loadingOrders: boolean;

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
  

  getOrders() {
    this.loadingOrders = true;
    this.ordersService.getOrders(this.params)
      .subscribe((data: any) => {
        this.orders = data.results;
        // console.log(this.orders);
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

