import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsGeneralService {

  constructor(private httpClient: HttpClient) { }

  getTags(params = {}) {
    const url = `${environment.HOST_APIV1}/tags/`;
    return this.httpClient.get(url, { params });
  }

  createTag(tag: any) {
    const url = `${environment.HOST_APIV1}/tags/`;
    return this.httpClient.post(url, tag);
  }

  editTag(idTag: number, tag: any) {
    const url = `${environment.HOST_APIV1}/tags/${idTag}/`;
    return this.httpClient.patch(url, tag)
  }

  deleteTag(idTag: number) {
    const url = `${environment.HOST_APIV1}/tags/${idTag}/`;
    return this.httpClient.delete(url);
  }
}
