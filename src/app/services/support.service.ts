import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private messageChanges = new Subject<any>();
  public messageChanges$ = this.messageChanges.asObservable();

  private floatingChatChanges = new Subject<any>();
  public floatingChatChanges$ = this.floatingChatChanges.asObservable();

  private openFloatingSupplierChat = new Subject<any>();
  public openFloatingSupplierChat$ = this.floatingChatChanges.asObservable();

  stationId;
  chatContent: HTMLElement;
  private newMessage = new Subject<void>();
  public newMessage$ = this.newMessage.asObservable();
  message: any;

  constructor(private http: HttpClient) {
    this.stationId = localStorage.getItem('station_id');
  }

  getSupports(params = {}) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/support/`;
    return this.http.get(url, { params });
  }

  getMessages(supportId, params = {}) {
    const url = `${environment.HOST_APIV1}/support/${supportId}/messages/`;
    return this.http.get(url, { params });
  }

  sendMessageSupport(supportId, message) {
    const url = `${environment.HOST_APIV1}/support/${supportId}/messages/`;
    return this.http.post(url, message);
  }

  openConversationWithClient(stationId, body) {
    console.log(stationId);
    const url = `${environment.HOST_APIV1}/stations/${stationId}/support/`;
    return this.http.post(url, body);
  }

  openOrCloseSupport(supportId, is_open) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/support/${supportId}/open_or_close/`;
    return this.http.patch(url, { is_open });
  }

  newFloatingSupplierChat(data, is_chat_id = false) {
    const payload: any = { is_chat_id };
    is_chat_id ? (payload.chat_id = data) : (payload.supplier = data);
    this.floatingChatChanges.next(payload);
  }

  openFloatingChat(payload, is_chat_id = false) {
    this.openFloatingSupplierChat.next({ payload, is_chat_id });
  }


}
