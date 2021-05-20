import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  stationId;
  searchText;
  params;

  constructor(private http: HttpClient) {
    this.stationId = localStorage.getItem('station_id');

  }

  getOrders(params = {}) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/`;
    return this.http.get(url, { params });
  }

  getOrderById(orderId) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/`;
    return this.http.get(url);
  }

  getNearestDeliveryMen(data, params = {}) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/delivery_men/nearest/`;
    return this.http.post(url, data, { params });
  }

  assignDeliveryToOrder(orderId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/assign_order/`;
    return this.http.put(url, data);
  }
  reassignDeliveryToOrder(orderId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/reassign_order/`;
    return this.http.put(url, data);
  }

  rejectOrder(orderId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/reject_order/`;
    return this.http.put(url, data);
  }
  cancelOrder(orderId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/cancel_order/`;
    return this.http.put(url, data);
  }

  acceptOrderMerchant(orderId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/accept_order_merchant/`;
    return this.http.put(url, data);
  }

  endOrderMerchant(orderId, data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/orders/${orderId}/ready_order_merchant/`;
    return this.http.put(url, data);
  }


  rejectOrderMerchant(orderId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/reject_order_merchant/`;
    return this.http.put(url, data);
  }
  cancelOrderMerchant(orderId, data) {
    const url = `${environment.HOST_APIV1}/stations/${this.stationId}/orders/${orderId}/cancel_order_merchant/`;
    return this.http.put(url, data);
  }
}
