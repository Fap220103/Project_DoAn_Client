import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, ReplaySubject, map } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  // Đăng nhập
  login(model: LoginModel) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((res: User) => {
        const user = res;
        if (user.code == 200) {
          this.setCurrentUser(user);
          console.log(this.currentUser$);
        }
      })
    );
  }

  // Đăng xuất
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  setCurrentUser(user: User) {
    user.content.roles = [];
    const roles = this.getDecodedToken(user.content.accessToken).roles;
    console.log(roles);
    Array.isArray(roles) ? user.content.roles = roles : user.content.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  getDecodedToken(token: string){
    console.log(atob(token.split('.')[1]));
    return JSON.parse(atob(token.split('.')[1]));
  }

}
