import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const accessToken = accountService.getAccessToken();

  if (
    !accessToken ||
    req.url.includes('/RefreshToken') ||
    req.url.includes('/login') ||
    req.url.includes('/logout')
  ) {
    return next(req);
  }
  if (accountService.isTokenExpired()) {
    return from(accountService.refreshToken()).pipe(
      switchMap(() => {
        const newToken = accountService.getAccessToken();
        if (!newToken) return throwError(() => new Error('Token refresh failed'));
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
