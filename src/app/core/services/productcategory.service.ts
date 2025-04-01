import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/productcategory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(this.baseUrl + "ProductCategory/GetAllProductCategory");
  }
  getCategorieName(parentId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "ProductCategory/GetProductCategoryName?parentId=" + parentId);
  }
}
