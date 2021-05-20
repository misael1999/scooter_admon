import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StationModel } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  station: StationModel;
  searchText;
  params;

  constructor(private http: HttpClient) {
    this.station = JSON.parse(localStorage.getItem('station'));

  }

  getClients(params = {}) {
    const url = `${environment.HOST_APIV1}/customers/`;
    return this.http.get(url, { params });
  }

  getClientId(idCustomer: number, params = {}) {
    const url = `${environment.HOST_APIV1}/customers/${idCustomer}/`;
    return this.http.get(url, { params });
  }
  getCustomerByDate(idCustomer: number, params = {}) {
    const url = `${environment.HOST_APIV1}/stations/${this.station.id}/customers/${idCustomer}/`;
    return this.http.get(url, { params });
  }

}
