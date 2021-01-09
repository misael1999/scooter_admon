import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, catchError, tap, retryWhen, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CancelOrderMerchantComponent } from './cancel-order-merchant/cancel-order-merchant.component';
import { DetailOrdersComponent } from '../detail-orders/detail-orders.component';
import { OrdersRoutingModule } from '../../orders/orders-routing.module';

@Component({
  selector: 'app-orders-in-process',
  templateUrl: './orders-in-process.component.html',
  styleUrls: ['./orders-in-process.component.scss']
})
export class OrdersInProcessComponent implements OnInit {

  stationId = localStorage.getItem('station_id');
  token = localStorage.getItem('access_token');
  WS_SOCKET = `${environment.WS_SOCKET}/ws/orders/${this.stationId}/?token=${this.token}`;
  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', order_status: '3,4,5,12,13,15,16', ordering: '', is_order_to_merchant: true };
  orders: Array<any> = [];
  loadingOrders: boolean;
  liveData$: Subscription;
  loadingAcceptOrder: boolean;
  loadingRejectOrder: boolean;
  loadingEndOrder: boolean;

  constructor(private ordersService: OrdersService, private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrders();
    // this.connectToWebSocket();
  }


  openDialogDetailProducts(details) {
    this.dialog.open(DetailOrdersComponent, {
      width: '500px',
      data: { details }
    });
  }


  ngOnDestroy(): void {
    // this.webSocketService.closeConnection();
    /*     this.webSocketService.close(); */
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
    this.getOrders();
  }

  orderingOrders(value: string) {
    this.params.ordering = value;
    this.getOrders();
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

  /*   openDialogAssignDelivery(order) {
      console.log(order);
      const dialogref = this.dialog.open(AssignDeliveryDialogComponent, {
        disableClose: true,
        width: '60%',
        minHeight: '500px',
        minWidth: '350px',
        data: { orderId: order.id, typeService: order.service_id}
      });
  
      dialogref.afterClosed().subscribe(data => {
        if (data) {
          this.getOrders();
        }
      });
    } */

  

  // ======= PAGINADOR ========
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