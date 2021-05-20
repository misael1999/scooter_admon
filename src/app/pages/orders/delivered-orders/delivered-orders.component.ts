import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { PageEvent } from '@angular/material/paginator';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.scss']
})
export class DeliveredOrdersComponent implements OnInit {
  // MATPAGINATOR INPUTS
  length = 0;
  pageSize = 25;
  pageIndex = 0;
  pageSizeOptions: number[] = [25, 50, 75, 100];


  // MATPAGINATOR  OUTPUT 
  pageEvent: PageEvent;


  // PARAMETROS
  params = { limit: 25, offset: 0, page: 1, search: '', ordering: '', order_status: '6' };
  orders: Array<any> = [];
  loadingdata: boolean;
  searchText;

  constructor(private ordersService: OrdersService, private dialog: MatDialog) { }

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
    this.loadingdata = true;
    this.ordersService.getOrders(this.params)
      .subscribe((data: any) => {
        this.loadingdata = false;
        this.orders = data.results;
        this.length = data.count;
        this.ordersService.params = this.params;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingdata = false;
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
    this.searchText = "";
    this.getOrders();
  }

  orderingOrders(value: string) {
    this.params.ordering = value;
    this.getOrders();
  }

  // METHOD PAGINATOR

  getPages(e): PageEvent {
    if (this.orders.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize
    this.params.offset = this.params.limit * e.pageIndex;
    this.getOrders();
  }
}

