import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  baseUrl: string = `${Constants.ApiResources}api/ProductImage/`;
  constructor(private http: HttpClient) {}
  // GET: Lấy danh sách ảnh theo productId
  getImages(productId: string): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    return this.http.get<any>(`${this.baseUrl}GetImagesByProductId`, { params });
  }

  // POST: Upload ảnh
  uploadImages(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}AddImage`, formData);
  }

  // POST: Đặt ảnh đại diện mới
  changeDefault(imageId: string, idDefault: string): Observable<any> {
    const params = new HttpParams().set('imageId', imageId).set('idDefault', idDefault);

    return this.http.post<any>(`${this.baseUrl}ChangeDefault`, null, { params });
  }

  // DELETE: Xoá ảnh
  deleteImage(imageId: string): Observable<any> {
    const params = new HttpParams().set('imageId', imageId);
    return this.http.delete<any>(`${this.baseUrl}DeleteImage`, { params });
  }
}
