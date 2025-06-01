import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.Order.Resource, injector);
  }
  getOrderById(orderId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetOrderById?orderId=${orderId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  getStatusUserOrder(userId: string, productId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetStatusUserOrder?UserId=${userId}&ProductId=${productId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  changeOrderStatus(model: any): Observable<any> {
    const url = `${this.svUrl}/UpdateOrderStatus`;
    return this.put(model, url);
  }

  changeStatusPayment(model: any): Observable<any> {
    const url = `${this.svUrl}/UpdateStatusPayment`;
    return this.put(model, url);
  }

  cancelOrder(model: any): Observable<any> {
    const url = `${this.svUrl}/CancelOrder`;
    return this.post(model, url);
  }

  getInvoice(orderId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetInvoice?orderId=${orderId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }
}
