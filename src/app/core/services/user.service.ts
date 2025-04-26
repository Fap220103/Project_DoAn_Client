import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.UserProfile.Resource, injector);
  }
  getProfile(userId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.svUrl}/GetProfile?userId=${userId}`;
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  changeProfile(model: any): Observable<any> {
    const url = `${this.svUrl}/UpdateProfile`;
    return this.put(model, url);
  }

  changePass(model: any): Observable<any> {
    const url = `${this.svUrl}/ChangePass`;
    return this.post(model, url);
  }
}
