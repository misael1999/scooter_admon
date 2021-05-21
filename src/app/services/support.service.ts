import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

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

}
