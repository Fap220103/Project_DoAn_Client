// import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { catchError, from, switchMap, throwError } from 'rxjs';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const accessToken = authService.getAccessToken();

//   if (
//     !accessToken ||
//     req.url.includes('/RefreshToken') ||
//     req.url.includes('/login-admin') ||
//     req.url.includes('/register') ||
//     req.url.includes('/login') ||
//     req.url.includes('/logout')
//   ) {
//     return next(req);
//   }
//   if (authService.isTokenExpired()) {
//     return from(authService.refreshToken()).pipe(
//       switchMap(() => {
//         const newToken = authService.getAccessToken();
//         if (!newToken) authService.logout();
//         const authReq = req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${newToken}`
//           }
//         });
//         return next(authReq);
//       }),
//       catchError((error) => {
//         return throwError(() => error);
//       })
//     );
//   }

//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   });
//   return next(authReq);
// };
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, from, switchMap, throwError, of, Subject, finalize } from 'rxjs';

let isRefreshing = false;
let refreshTokenSubject = new Subject<string>();

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  if (
    !accessToken ||
    req.url.includes('/RefreshToken') ||
    req.url.includes('/login-admin') ||
    req.url.includes('/register') ||
    req.url.includes('/login') ||
    req.url.includes('/logout')
  ) {
    return next(req);
  }

  if (authService.isTokenExpired()) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject = new Subject<string>();

      return from(authService.refreshToken()).pipe(
        switchMap(() => {
          const newToken = authService.getAccessToken();
          if (!newToken) {
            authService.logout();
            return throwError(() => new Error('No new token'));
          }
          refreshTokenSubject.next(newToken);
          return next(
            req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            })
          );
        }),
        catchError((error) => {
          authService.logout();
          return throwError(() => error);
        }),
        finalize(() => {
          isRefreshing = false;
        })
      );
    } else {
      return refreshTokenSubject.pipe(
        switchMap((newToken) => {
          return next(
            req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            })
          );
        })
      );
    }
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return next(authReq);
};
