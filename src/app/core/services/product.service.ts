import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.Product.Resource, injector);
  }

  deleteProduct(userId: string, productId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}?userid=${userId}&productId=${productId}`;
    return this.http.delete(url, { headers: headers, withCredentials: true });
  }

  getProductById(productId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetById?productId=${productId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  getProductByCategory(ids: string[], page?: number, limit?: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const xLimit = limit ? limit : 10;
    const xPage = page ? page : 1;
    const idsParam = ids.join(',');
    let url = `${this.svUrl}/GetByCategoryId?categoryId=${idsParam}`;
    url += '&page=' + xPage + '&limit=' + xLimit;

    return this.http.get(url, { headers: headers, withCredentials: true });
  }
}
