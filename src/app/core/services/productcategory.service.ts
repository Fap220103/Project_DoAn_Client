import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateCategory,
  ProductCategory,
  ProductCategoryName
} from '../models/productcategory.model';
import { ResponseCreate } from '../models/response.model';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.ProductCategory.Resource, injector);
  }

  createCategory(model: any): Observable<any> {
    const url = `${this.svUrl}/CreateProductCategory`;
    return this.post(model, url);
  }

  updateCategory(model: any): Observable<any> {
    const url = `${this.svUrl}/UpdateProductCategory`;
    return this.post(model, url);
  }

  // deleteCategory(userId: any, categoryId: string) {
  //   return this.http.delete<any>(`${this.baseUrl}ProductCategory/DeleteProductCategory`, {
  //     params: {
  //       UserId: userId,
  //       ProductCategoryId: categoryId
  //     }
  //   });
  // }
}
