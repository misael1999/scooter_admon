import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  stationId;

  constructor(private httpClient: HttpClient) {
    this.stationId = localStorage.getItem('station_id');
  }

  createPromotion(params) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/customer_promotions/`;
    return this.httpClient.post(url, params);
  }

  getCustomersPromotions(params) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/customer_promotions/`;
    return this.httpClient.get(url, { params });
  }
}
