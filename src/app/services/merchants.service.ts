import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StationModel } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {

  station: StationModel;

  constructor(private http: HttpClient) { 
    this.station = JSON.parse(localStorage.getItem("station"));
  }

  getMerchants(params = {}) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/`;
    return this.http.get(url, { params });
  }

  getMerchantById(merchantId) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/${merchantId}/`;
    return this.http.get(url);
  }

  opeOrcloseMerchant(merchantId, isOpen) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/${merchantId}/update_availability/`;
    return this.http.put(url, { is_open: isOpen });
  }

  createMerchant(merchant: any) {
    const url = `${environment.HOST_APIV1}/merchants/`;
    return this.http.post(url, merchant);
  }

  deleteMerchant(merchantId) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/${merchantId}/`;
    return this.http.delete(url);
  }

  unlockMerchant(merchantId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/${merchantId}/unlock`;
    return this.http.put(url, data);
  }

  // Other Methods
  getCategories() {
    const url = `${environment.HOST_APIV1}/commons/categories/`;
    return this.http.get(url);
  }


}
