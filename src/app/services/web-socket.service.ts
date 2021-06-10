import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;
  webSocket: WebSocketSubject<any>;

  connect(URL): Observable<any> {
    this.connection$ = webSocket(URL);
    return this.connection$.asObservable();
  }

  connectToChat(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const WS_SOCKET = `${environment.WS_SOCKET}/ws/chats?token=${token}`;
    if (!this.connection$) {
      this.connection$ = webSocket(WS_SOCKET);
    }
    return this.connection$.asObservable();
  }

  sendData(data: any) {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }
  getCurrentSocket() {
    return this.connection$.asObservable();
  }


  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }

}
