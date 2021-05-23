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
import { RejectOrderMerchantComponent } from './reject-order-merchant/reject-order-merchant.component';
import { SendMessageDialogComponent } from '../send-message-dialog/send-message-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss']
})

export class NewOrdersComponent implements OnInit, OnDestroy {
  stationId = localStorage.getItem('station_id');
  token = localStorage.getItem('access_token');
  WS_SOCKET = `${environment.WS_SOCKET}/ws/orders/${this.stationId}/?token=${this.token}`;
  length = 100;
  pageIndex = 0;
  pageSize = 25;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  orders: Array<any> = [];
  loadingData: boolean;
  params = { limit: 15, offset: 0, search: '', order_status: '1,13,14', ordering: '' };
  liveData$: Subscription;
  searchText;


  loadingAcceptOrder: boolean;
  loadingRejectOrder: boolean;

  constructor(
    private ordersService: OrdersService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private webSocketService: WebSocketService,
    private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
    this.connectToWebSocket();
  }

  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      height: '78%',
      width: '70%',
      data: { order }
    });
  }




  rejectOrderMerchant(orderId) {
    const dialogref = this.dialog.open(RejectOrderMerchantComponent, {
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


  ngOnDestroy(): void {
    this.webSocketService.closeConnection();
    /*     this.webSocketService.close(); */
  }
  openDirection(addres) {
    console.log(addres);
    window.open(`https://maps.google.com/?q=${addres.coordinates[1]},${addres.coordinates[0]}`, '_blank');
  }

  accepOrderMerchant(orderId) {
    this.loadingAcceptOrder = true;
    this.ordersService.acceptOrderMerchant(orderId, {})
      .subscribe((data: any) => {
        this.loadingAcceptOrder = false;
        this.snackBar.open('Pedido aceptado', '', {
          duration: 4000,
          panelClass: 'main-snackbar'
        });
        this.getOrders();
      }, error => {
        this.loadingAcceptOrder = false;
        alert('Ha ocurrido un error al aceptar el pedido');
      });
  }

  getOrders() {
    this.loadingData = true;
    this.ordersService.getOrders(this.params)
      .subscribe((data: any) => {
        this.orders = data.results;
        this.loadingData = false;
        this.length = data.count;
        // console.log(this.orders);
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
  orderBy(value: string) {
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
    const audio = new Audio();
    audio.src = 'assets/sounds/ringtone_merchant.mp3';
    audio.load();
    audio.play();
  }


  openDialogSendMessageOrder(order) {
    if (order.supports.length > 0) {
      this.router.navigateByUrl(`/support/${order.supports[0]}/messages`);
      return;
    }
    const dialogref = this.dialog.open(SendMessageDialogComponent, {
      disableClose: true,
      width: '450px',
      data: { order }
    });
    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getOrders();
      }
    });
  }
}
