import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMenService {

  constructor(private http: HttpClient) { }


  getDeliverys() {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/`;
    return this.http.get(url);
  }

  createDelevery(delivery) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/`;
    return this.http.post(url, delivery );
  }


}
