import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { retryWhen } from 'rxjs/internal/operators/retryWhen';
import { SupportService } from 'src/app/services/support.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-support',
  templateUrl: './main-support.component.html',
  styleUrls: ['./main-support.component.scss']
})
export class MainSupportComponent implements OnInit {
  stationId = localStorage.getItem('station_id');
  token = localStorage.getItem('access_token');
  WS_SOCKET = `${environment.WS_SOCKET}/ws/support/${this.stationId}/?token=${this.token}`;

  loadingSupports = false;
  // Info
  supports = [];
  supportSelected;

  constructor(private webSocketService: WebSocketService,
              private supportService: SupportService) { }

  ngOnInit(): void {
    this.connectToWebSocket();
    this.getSupports();
  }

  getSupports() {
    this.loadingSupports = true;
    this.supportService.getSupports()
      .subscribe((data: any) => {
        this.loadingSupports = false;
        this.supports = data.results;
        console.log(this.supports);
        

    }, error => {
      this.loadingSupports = false;
      alert('Ha ocurrido un error al obtener los tickets de soporte');
    });
  }

  supportSelectedEvent(support) {
    this.supportSelected = support;
  }


  ngOnDestroy(): void {
    this.webSocketService.closeConnection();
    /*     this.webSocketService.close(); */
  }

  connectToWebSocket() {
    this.webSocketService.connect(this.WS_SOCKET).pipe(
      retryWhen((errors) => errors.pipe(delay(5000)))
    ).subscribe((data: any) => {
      console.log("SOCKET");
      console.log(data);


      if (data.data.type && data.data.type === 'NEW_MESSAGE_SUPPORT') {
        this.playAudio();
        // this.getOrders();
      }
      //   // this.openSnackbarNewOrder('Nuevo pedido');
      // if (data.data.type && data.data.type === 'ACCEPT_ORDER') {
      //   // this.openSnackbarNewOrder('Pedido aceptado por el repartidor');
      // }
    });
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "assets/sounds/message.mp3";
    audio.load();
    audio.play();
  }


}
