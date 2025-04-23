import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.ProductVariant.Resource, injector);
  }

  getCZByProductId(productId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetCZVariant?productId=${productId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  getProductVariantId(productId: string, colorId: number, sizeId: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetProductVariantId?productId=${productId}&colorId=${colorId}&sizeId=${sizeId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  getStock(variantId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetStock?productVariantId=${variantId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  addStock(model: any): Observable<any> {
    const url = `${this.svUrl}/AddStock`;
    return this.post(model, url);
  }
}
