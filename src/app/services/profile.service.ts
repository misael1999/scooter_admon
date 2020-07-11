import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getStation() {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/`;
    return this.httpClient.get(url);
  }


}
