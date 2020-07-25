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
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/${idVehicle}/`;
    return this.httpClient.get(url);
  }

  getTypeVehicles() {
    const url = `${environment.HOST_APIV1}/commons/type_vehicles/`;
    return this.httpClient.get(url);
  }

  createVehicle(vehicle: any) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/`;
    return this.httpClient.post(url, vehicle);
  }

  editVehicle(idVehicle: number, vehicle: any) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/${idVehicle}/`;
    return this.httpClient.patch(url, vehicle);
  }

  unLockVehicle(idVehicle: number) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/${idVehicle}/unlock/`;
    return this.httpClient.patch(url, {status: 1});
  }

  deleteVehicle(idVehicle: number) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/vehicles/${idVehicle}/`;
    return this.httpClient.delete(url);
  }


}
