import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagByMerchantsService {

  constructor(private httpClient: HttpClient) { }


  createTags(idMerchant, tags) {
    const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/tags/`;
    return this.httpClient.post(url, tags);
  }




}