import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCategory, ProductCategory, ProductCategoryName } from '../models/productcategory.model';
import { ResponseCreate } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(this.baseUrl + "ProductCategory/GetAllProductCategory");
  }

  getCategoriesName(): Observable<ProductCategoryName> {
    return this.http.get<ProductCategory>(this.baseUrl + "ProductCategory/GetProductCategoryName");
  }

  createCategory(model: FormData): Observable<ResponseCreate> {
    return this.http.post<any>(this.baseUrl + "ProductCategory/CreateProductCategory", model);
  }

  deleteCategory(userId: any, categoryId: string) {
    return this.http.delete<any>(`${this.baseUrl}ProductCategory/DeleteProductCategory`,
    {
      params: {
        UserId: userId,
        ProductCategoryId: categoryId
      }
    });
  }
  
}
