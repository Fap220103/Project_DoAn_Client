import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseCreate } from '../models/response.model';
import { ColorResult } from '../models/color.model';
import { ApiResponse } from '../models/common.model';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class ColorService extends BaseService<any> {

  constructor(http: HttpClient, injector: Injector) {
    super(http,Constants.Color.Resource,injector)
   }

}
