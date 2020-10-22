import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  sendNotifications(data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/commons/notifications/`;
    return this.http.post(url, data);
  }

}
