import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.scss']
})
export class DeliveredOrdersComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  pageEvent: PageEvent;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', ordering: '', order_status: '6' };
  orders: Array<any> = [];
  loadingOrders: boolean;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
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

  //Paginator
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

