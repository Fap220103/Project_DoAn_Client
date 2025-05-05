import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.Discount.Resource, injector);
  }
  getUserDiscount(userId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetUserDiscount?userId=${userId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  getStatusUserDiscount(userId: string, discountId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetStatusUserDiscount?UserId=${userId}&DiscountId=${discountId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  addUserDiscount(model: any): Observable<any> {
    const url = `${this.svUrl}/AddUserDiscount`;
    return this.post(model, url);
  }
  getDiscountAdmin(params?: any, page?: number, limit?: number, orderby?: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    let url = this.svUrl;
    const xLimit = limit ? limit : 10;
    const xPage = page ? page : 1;
    url += '/GetDiscountAdmin?page=' + xPage + '&limit=' + xLimit;

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
    return this.http.get(url, { headers: headers, withCredentials: true });
  }
}
