import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  stationId;

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

}
