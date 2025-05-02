import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<any> {
  constructor(
    http: HttpClient,
    injector: Injector,
    public snackBar: MatSnackBar
  ) {
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

  getRsProduct(productId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/getRsProduct?productId=${productId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  addViewCount(model: any): Observable<any> {
    const url = `${this.svUrl}/AddViewCount`;
    return this.post(model, url);
  }
  // getProductByCategory(ids: string[], page?: number, limit?: number): Observable<any> {
  //   const headers: HttpHeaders = new HttpHeaders();
  //   const xLimit = limit ? limit : 10;
  //   const xPage = page ? page : 1;
  //   const idsParam = ids.join(',');
  //   let url = `${this.svUrl}/GetByCategoryId?categoryId=${idsParam}`;
  //   url += '&page=' + xPage + '&limit=' + xLimit;

  //   return this.http.get(url, { headers: headers, withCredentials: true });
  // }

  getProductByCategory(
    params?: any,
    page?: number,
    limit?: number,
    orderby?: any
  ): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    let url = `${this.svUrl}/GetByCategoryId`;
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
      let orderValue = '';
      if (orderby.sortBy) orderValue += orderby.sortBy;
      if (orderby.order) orderValue += '|' + orderby.order;

      url += '&ORDER=' + encodeURIComponent(orderValue);
    }

    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  exportToExcel() {
    this.http.get(`${this.svUrl}/export`, { responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = response as Blob;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'products.xlsx';
        link.click();
        this.snackBar.open('Export successful!', 'OK', { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open('Error exporting file.', 'OK', { duration: 2000 });
      }
    });
  }
}
