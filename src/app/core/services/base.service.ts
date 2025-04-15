import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';

export class BaseService<T> {
  svUrl: string;
  injector: Injector;
  http: HttpClient;
  ignoreAuthorization = false;
  apiDomain = Constants.ApiResources;
  constructor(
    private _http: HttpClient,
    endpoint: string,
    _injector: Injector
  ) {
    this.svUrl = this.apiDomain + endpoint;
    this.injector = _injector;
    this.http = _http;
  }
  get(params?: any, page?: number, limit?: number, orderby?: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    let url = this.svUrl;
    const xLimit = limit ? limit : 10;
    const xPage = page ? page : 1;
    url += '?page=' + xPage + '&limit=' + xLimit;

    if (params && Object.keys(params).length > 0) {
      for (const key of Object.keys(params)) {
        if (params[key] != null && params[key] != undefined)
          url += '&' + key + '=' + encodeURIComponent(params[key]);
      }
    }
    if (orderby && Object.keys(orderby).length > 0) {
      for (const key of Object.keys(orderby)) {
        if (orderby[key] != null && orderby[key] != undefined)
          url += '&ORDER=' + key + '|' + encodeURIComponent(orderby[key]);
      }
    }
    return this.http.get(url, { headers: headers });
  }

  post(data: T, endpoint?: any): Observable<any> {
    const url = endpoint ? this.apiDomain + endpoint : this.svUrl;
    return this.http.post(url, data);
  }

  delete(id: string, endpoint?: any): Observable<any> {
    const url = endpoint ? this.apiDomain + endpoint : `${this.svUrl}/${id}`;
    return this.http.delete(url);
  }
}
