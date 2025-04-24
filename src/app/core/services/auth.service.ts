import { Content } from '../models/response.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, tap, throwError } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = Constants.ApiResources;
  private readonly TOKEN_KEY = 'access_token';
  private readonly EXPIRES_AT_KEY = 'expires_at';
  private readonly ROLE_KEY = 'userRole';
  private readonly USER_KEY = 'userId';
  private readonly NAVIGATION = 'menu';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLogin());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Đăng nhập
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}Account/Login`, // Giả định endpoint đăng nhập
        credentials,
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          this.saveTokens(response.content.accessToken, response.content.expires_in_second);
          this.setCurrentUser(response);
          this.updateLoginStatus(true);
        })
      );
  }

  // Đăng xuất admin
  logout(type?: any): void {
    const userId = this.getUserId();
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.NAVIGATION);

    this.updateLoginStatus(false);

    this.http
      .post(`${this.baseUrl}Account/Logout?userId=${userId}`, {}, { withCredentials: true })
      .subscribe({
        complete: () => {
          const redirectPath = type === 'admin' ? '/auth/login-admin' : '/login';
          this.router.navigate([redirectPath]);
        }
      });
  }
  register(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    const url = `${this.baseUrl}api/account/register`;
    return this.http.post(url, data, { headers: headers, withCredentials: true });
  }

  private updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }
  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  isAdmin(): boolean {
    const roles = this.getUserRole(); // trả về mảng string[]
    return roles.includes('Admin');
  }

  saveTokens(accessToken: string, expiresInSeconds: number): void {
    const expiresAt = Date.now() + expiresInSeconds * 1000;
    //const expiresAt = Date.now() - 1000; // test refresh token
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString());
  }

  // Lấy access token
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): any {
    return localStorage.getItem(this.USER_KEY);
  }
  getMenu(): any {
    const value = localStorage.getItem(this.NAVIGATION);
    return value ? JSON.parse(value) : null;
  }

  isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
    if (!expiresAt) return true;
    return Date.now() >= parseInt(expiresAt, 10);
  }

  isLoggedIn(): boolean {
    return this.checkLogin();
  }

  refreshToken(): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}Account/RefreshToken`, {}, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.saveTokens(response.content.accessToken, response.content.expires_in_second);
          this.updateLoginStatus(true);
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  setCurrentUser(user: any) {
    user.content.roles = [];
    const decodedToken = this.getDecodedToken(user.content.accessToken);
    const roles = decodedToken.roles;
    Array.isArray(roles) ? (user.content.roles = roles) : user.content.roles.push(roles);
    const userId =
      decodedToken['sub'] ||
      decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
      null;
    const menu = user.content.mainNavigations;
    //localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.USER_KEY, userId);
    localStorage.setItem(this.ROLE_KEY, roles);
    localStorage.setItem(this.NAVIGATION, JSON.stringify(menu));
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  checkLogin(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired();
  }
}
