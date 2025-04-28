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

  addUserDiscount(model: any): Observable<any> {
    const url = `${this.svUrl}/AddUserDiscount`;
    return this.post(model, url);
  }
}
