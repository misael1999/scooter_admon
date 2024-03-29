import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StationModel } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {
  station: StationModel;
  merchantId;
  merchant;
  searchText;
  params;

  constructor(private http: HttpClient) {
    this.station = JSON.parse(localStorage.getItem('station'));
  }

  getMerchants(params = {}) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/`;
    return this.http.get(url, { params });
  }

  getMerchantById(merchantId) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/${merchantId}/`;
    return this.http.get(url);
  }

  updateMerchantStation(merchantId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/${merchantId}/`;
    return this.http.patch(url, data);
  }

  opeOrcloseMerchant(merchantId, isOpen) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/${merchantId}/update_availability/`;
    return this.http.put(url, { is_open: isOpen });
  }

  createMerchant(merchant: any) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/merchants/`;
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

  getSummaryMerchant(merchantId, queryparams = {}) {
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/statistics/summary/`;
    return this.http.get(url, { params: queryparams });
  }

  // Other Methods
  getCategories() {
    const url = `${environment.HOST_APIV1}/commons/categories/`;
    return this.http.get(url);
  }
  getProductsByMerchant(merchantId, params = {}) {
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/products/`;
    return this.http.get(url, { params });
  }

  // Get review by merchant
  getReviews(merchantId, params = {}) {
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/ratings/`;
    return this.http.get(url, { params });
  }
  // Get tags by merchant
  getTags(merchantId) {
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/tags/`;
    return this.http.get(url);
  }

}
