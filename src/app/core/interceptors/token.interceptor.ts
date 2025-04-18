import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  if (
    !accessToken ||
    req.url.includes('/RefreshToken') ||
    req.url.includes('/login') ||
    req.url.includes('/logout')
  ) {
    return next(req);
  }
  if (authService.isTokenExpired()) {
    return from(authService.refreshToken()).pipe(
      switchMap(() => {
        const newToken = authService.getAccessToken();
        if (!newToken) authService.logout();
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`
          }
        });
        return next(authReq);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return next(authReq);
};
