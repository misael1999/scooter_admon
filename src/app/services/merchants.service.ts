import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {

  constructor(private http: HttpClient) { }

  getMerchants(params = {}) {
    const url = `${environment.HOST_APIV1}/merchants/`;
    return this.http.get(url, { params });
  }

  opeOrcloseMerchant(merchantId, isOpen) {
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/update_availability/`;
    return this.http.put(url, { is_open: isOpen });
  }

  createMerchant(merchant: any) {
    const url = `${environment.HOST_APIV1}/merchants/`;
    return this.http.post(url, merchant);
  }

  // Other Methods
  getCategories() {
    const url = `${environment.HOST_APIV1}/commons/categories/`;
    return this.http.get(url);
  }


}
