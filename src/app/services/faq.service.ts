import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private httpClient: HttpClient) {
  }

  getGroup() {
    const url = `${environment.HOST_APIV1}/commons/group/faq/`;
    return this.httpClient.get(url);
  }

  createGroup(group: string) {
    const url = `${environment.HOST_APIV1}/commons/group/faq/`;
    return this.httpClient.post(url, group);
  }

  // Methods for FAQ
  getFaq(params = {}) {
    const url = `${environment.HOST_APIV1}/commons/faq/`;
    return this.httpClient.get(url, { params });
  }

  createFaq(faq) {
    const url = `${environment.HOST_APIV1}/commons/faq/`;
    return this.httpClient.post(url, faq);
  }

  editFaq(idFaq:number, faq: any) {
    const url = `${environment.HOST_APIV1}/commons/faq/${idFaq}/`;
    return this.httpClient.patch(url, faq)
  }

  deleteFaq(idFaq: number) {
    const url = `${environment.HOST_APIV1}/commons/faq/${idFaq}/`;
    return this.httpClient.delete(url);
  }
}




