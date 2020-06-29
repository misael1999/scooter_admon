import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private httpClient: HttpClient) { }

  getVehicles() {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.get(url);
  }

  getVehiclesId(idVehicle) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.post(url, idVehicle);
  }

  createVehicle(vehicle: any) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.post(url, vehicle);
  }

  editVehicle(Vehicles) {

  }

  deleteVehicle(idVehicle) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.delete(url, idVehicle);
  }


}
