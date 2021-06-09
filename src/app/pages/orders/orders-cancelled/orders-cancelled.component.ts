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
  length = 100;
  pageSize = 25;
  pageIndex = 0;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  pageEvent: PageEvent;
  params = { limit: 25, offset: 0, search: '', ordering: '', order_status: '7,8,17' };
  orders: Array<any> = [];
  loadingData: boolean;
  searchText;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  openDialogDetailProducts(order) {
    this.dialog.open(OrdersDetailComponent, {
      width: '600px',
      data: { order }
    });
  }

  getOrders() {
    this.loadingData = true;
    this.ordersService.getOrders(this.params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.orders = data.results;
        this.length = data.count;
        this.ordersService.params = this.params;
        this.pageSize = this.params.limit;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingData = false;
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

