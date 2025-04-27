import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.ShippingAddress.Resource, injector);
  }
  updateShippingAddress(model: any): Observable<any> {
    const url = `${this.svUrl}/updateAddress`;
    return this.put(model, url);
  }

  getAddressDefault(userId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetAddressDefault?userId=${userId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }
}
