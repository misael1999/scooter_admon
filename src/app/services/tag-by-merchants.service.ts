import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagByMerchantsService {

  constructor(private httpClient: HttpClient) { }


  // getTags(idMerchant: number, params = {}) {
  //   const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/tags/`;
  //   return this.httpClient.get(url, { params });
  // }

  createTag(idMerchant, tags) {
    const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/tags/`;
    return this.httpClient.post(url, tags)
  }

  // deleteTag(: number) {
  //   const url = `${environment.HOST_APIV1}/merchants/${idMerchant}/tags/${merchantTagId}`;
  //   return this.httpClient.delete(url);



}