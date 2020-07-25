import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StationModel } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  station: StationModel;

  constructor(private httpClient: HttpClient) { }

  getStation() {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/`;
    return this.httpClient.get(url);
  }

  updateStation(data: Object) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/update_info/`;
    return this.httpClient.patch(url, data);
  }


}
