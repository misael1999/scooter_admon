import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AssignDeliveryDialogComponent } from './assign-delivery-dialog/assign-delivery-dialog.component';
import { RejectOrderDialogComponent } from './reject-order-dialog/reject-order-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { map, catchError, tap, retryWhen, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss']
})

export class NewOrdersComponent implements OnInit, OnDestroy {
  stationId = localStorage.getItem('station_id');
  token = localStorage.getItem('access_token');
  WS_SOCKET = `${environment.WS_SOCKET}/ws/orders/${this.stationId}/?token=${this.token}`;
  // MatPaginator Inputs
  length = 100;
  pageSize = 15;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  // Parametros para el paginado
  params = { limit: 15, offset: 0, search: '', order_status: '1,13', ordering: '' };
  orders: Array<any> = [];
  loadingOrders: boolean;
  liveData$: Subscription;

  constructor(private ordersService: OrdersService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.getOrders();
    // this.connectToWebSocket();
  }

  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      width: '90%',
      data: { order }
    });
  }
  ngOnDestroy(): void {
    this.webSocketService.closeConnection();
    /*     this.webSocketService.close(); */
  }
  openDirection(addres) {
    console.log(addres);
    window.open(`https://maps.google.com/?q=${addres.coordinates[1]},${addres.coordinates[0]}`, '_blank');
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

  openDialogAssignDelivery(order) {
    console.log(order);
    const dialogref = this.dialog.open(AssignDeliveryDialogComponent, {
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

  openDialogRejectOrder(orderId) {
    const dialogref = this.dialog.open(RejectOrderDialogComponent, {
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
  orderingOrders(value: string) {
    this.params.ordering = value;
    this.getOrders();
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

  connectToWebSocket() {
    this.webSocketService.connect(this.WS_SOCKET).pipe(
      retryWhen((errors) => errors.pipe(delay(5000)))
    ).subscribe((data: any) => {
      if (data.data.type && data.data.type === 'NEW_ORDER') {
        if (data.data.type && data.data.type === 'NEW_ORDER') {
          this.playAudio();
          this.getOrders();
        }
        // this.openSnackbarNewOrder('Nuevo pedido');
      }
      if (data.data.type && data.data.type === 'ACCEPT_ORDER') {
        this.openSnackbarNewOrder('Pedido aceptado por el repartidor');
      }
    });
  }

  openSnackbarNewOrder(message) {
    const snackBarRef = this.snackBar.open(message, 'Recargar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    snackBarRef.onAction().subscribe(() => {
      this.params = { limit: 15, offset: 0, search: '', order_status: '1', ordering: '' };
      this.getOrders();
    });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "assets/sounds/ringtone_merchant.mp3";
    audio.load();
    audio.play();
  }



}
