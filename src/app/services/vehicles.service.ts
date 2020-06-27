import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) {

  }

  getVehicles() {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.http.get(url);
  }

  createVehicle(vehicle) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.http.post(url, vehicle );
  }

  getVehiclesId(idVehicle) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.http.post(url, idVehicle );
  }

}
