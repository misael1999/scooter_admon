import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private http: HttpClient) { }

  getAreaByStation(params = {}) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/area/`;
    return this.http.get(url, { params });
  }

  getZones(params = {}) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/zones/`;
    return this.http.get(url, { params });
  }

  addZone(data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/zones/`;
    return this.http.post(url, data);
  }

  updateZone(zoneId, data) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/zones/${zoneId}/`;
    return this.http.patch(url, data);
  }

  deleteZone(zoneId) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/zones/${zoneId}/`;
    return this.http.delete(url);
  }

  activeZone(zoneId) {
    const stationId = localStorage.getItem('station_id');
    const url = `${environment.HOST_APIV1}/stations/${stationId}/zones/${zoneId}/unlock/`;
    return this.http.patch(url, {});
  }

}
