import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  searchText;
  params;

  constructor(private http: HttpClient) { }

  getClients(params = {}) {
    const url = `${environment.HOST_APIV1}/customers/`;
    return this.http.get(url, { params });
  }

  getClientId(id: number, params = {}) {
    const url = `${environment.HOST_APIV1}/customers/${id}/`;
    return this.http.get(url, { params });
  }

}
