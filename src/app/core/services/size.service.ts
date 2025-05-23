import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SizeService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.Size.Resource, injector);
  }
}
