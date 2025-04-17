import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'accessToken'; 

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); 
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); 
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey); 
  }

  refreshToken() {
    return this.http.post<{ accessToken: string }>(
      '/api/auth/refresh-token',
      {}, 
      { withCredentials: true } 
    ).pipe(
      map(response => response.accessToken)
    );
  }
}
