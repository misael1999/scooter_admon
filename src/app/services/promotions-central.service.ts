import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionsCentralService {

  constructor(private httpClient: HttpClient) { }

  createPromotionByMerchant(idMerchant, data) {
    const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/promotions/`;
    return this.httpClient.post(url, data);
  }

  getPromotionsByMerchant(idMerchant, params = {}) {
    const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/promotions/`;
    return this.httpClient.get(url, { params });
  }

  getPromotionMerchantById(idMerchant, idPromotion) {
    const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/promotions/${idPromotion}/`;
    return this.httpClient.get(url);
  }

  editPromotionByMerchant(idMerchant, idPromotion, data) {
    const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/promotions/${idPromotion}/`;
    return this.httpClient.patch(url, data);
  }

  deletePromotionByMerchant(idMerchant, idPromotion) {
    const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/promotions/${idPromotion}/`;
    return this.httpClient.delete(url);
  }
}
