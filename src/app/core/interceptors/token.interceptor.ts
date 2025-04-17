import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService); 
  const token = tokenService.getToken(); 

  if (token) {
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    });

    return next(clonedRequest); 
  }

  return next(req);
};
