import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(params = {}) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/orders/`;
    return this.http.get(url, { params });
  }

  getNearestDeliveryMen(data, params = {}) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/delivery_men/nearest/`;
    return this.http.post(url, data, { params });
  }

  assignDeliveryToOrder(orderId, data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/orders/${orderId}/assign_order/`;
    return this.http.put(url, data);
  }

  rejectOrder(orderId, data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/orders/${orderId}/reject_order/`;
    return this.http.put(url, data);
  }
  acceptOrderMerchant(orderId, data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/orders/${orderId}/accept_order_merchant/`;
    return this.http.put(url, data);
  }

  rejectOrderMerchant(orderId, data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/orders/${orderId}/reject_order_merchant/`;
    return this.http.put(url, data);
  }
  cancelOrderMerchant(orderId, data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/orders/${orderId}/cancel_order_merchant/`;
    return this.http.put(url, data);
  }
}
