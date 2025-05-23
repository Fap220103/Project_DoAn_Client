import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.Setting.Resource, injector);
  }
  getGeneralSetting(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetGeneralSetting`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }
}
