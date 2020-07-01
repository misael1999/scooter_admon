import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private httpClient: HttpClient) { }

  getVehicles(params = {}) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.get(url, { params });
  }

  getVehiclesId(idVehicle: number) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.post(url, idVehicle);
  }

  createVehicle(vehicle: any) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.post(url, vehicle);
  }

  editVehicle(vehicles: any) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.patch(url, vehicles);
  }

  deleteVehicle(idVehicle: number) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/${idVehicle}/`;
    return this.httpClient.delete(url);
  }


}
