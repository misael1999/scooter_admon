import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMenService {
  searchText;
  params;

  constructor(private httpClient: HttpClient) { }

  getDeliverys(params = {}) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/`;
    return this.httpClient.get(url, { params });
  }

  getDeliveryById(idDelivery: number, params = {}) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/${idDelivery}/`;
    return this.httpClient.get(url, { params });
  }

  unLockDeliveryMan(idDelivery) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/${idDelivery}/unlock/`;
    return this.httpClient.put(url, { status_id: 1 });
  }

  createDelevery(delivery: any) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/`;
    return this.httpClient.post(url, delivery);
  }

  editDelivery(idDelivery: number, delivery: any) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/${idDelivery}/`;
    return this.httpClient.patch(url, delivery);
  }

  deleteDelivery(idDelivery: number) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/${idDelivery}/`;
    return this.httpClient.delete(url);
  }
}
