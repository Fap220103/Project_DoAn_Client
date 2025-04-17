import { Content } from './../models/response.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, tap, throwError } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'access_token';
  private readonly EXPIRES_AT_KEY = 'expires_at';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.setCurrentUser(user);
    } else {
      this.currentUserSource.next(null);
    }
  }

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
        })
      );
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
    // Gọi API logout để xóa cookie refreshToken (nếu có)
    this.http.post(`${this.baseUrl}Account/Logout`, {}, { withCredentials: true }).subscribe();
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  saveTokens(accessToken: string, expiresInSeconds: number): void {
    const expiresAt = Date.now() + expiresInSeconds * 1000; // Chuyển giây thành milliseconds
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString());
  }

  // Lấy access token
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Kiểm tra xem token có hết hạn không
  isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
    if (!expiresAt) return true;
    return Date.now() >= parseInt(expiresAt, 10);
  }

  // Gọi API refresh token
  refreshToken(): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/Account/RefreshToken`, {}, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.saveTokens(response.content.accessToken, response.content.expires_in_second);
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  // Đăng nhập
  // login(model: LoginModel) {
  //   return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
  //     map((res: User) => {
  //       const user = res;
  //       if (user.code == 200) {
  //         this.setCurrentUser(user);
  //         return res;
  //       }
  //       throw new Error('Login failed');
  //     })
  //   );
  // }

  // Đăng xuất
  // logout() {
  //   localStorage.removeItem('user');
  //   this.currentUserSource.next(null);
  // }
  setCurrentUser(user: any) {
    user.content.roles = [];
    const roles = this.getDecodedToken(user.content.accessToken).roles;
    Array.isArray(roles) ? (user.content.roles = roles) : user.content.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', roles);
    this.currentUserSource.next(user);
  }
  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  getUserId() {
    let userId: string | null = null;
    this.currentUser$.subscribe((user) => {
      if (user && user.content.accessToken) {
        const decodedToken = this.getDecodedToken(user.content.accessToken);
        userId =
          decodedToken['sub'] ||
          decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
          null;
      }
    });
    return userId;
  }
}
