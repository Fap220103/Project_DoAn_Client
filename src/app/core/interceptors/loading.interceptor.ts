import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy.service';
import { inject } from '@angular/core';
import { delay, finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  const loadingEndpoints = [
    { urlPart: '/api/product', method: 'POST' },
    { urlPart: '/api/ProductVariant/GetCZVarian', method: 'GET' },
    { urlPart: '/api/Product/GetGeneralReview', method: 'GET' },
    { urlPart: '/api/Product/getRsProduct', method: 'GET' },
    { urlPart: '/api/order', method: 'POST' },
    { urlPart: '/api/news', method: 'POST' },
    { urlPart: '/api/UserProfile', method: 'PUT' }
  ];

  const shouldApplyLoading = loadingEndpoints.some(
    (ep) => req.url.toLowerCase().includes(ep.urlPart.toLowerCase()) && req.method === ep.method
  );

  if (shouldApplyLoading) {
    busyService.busy();
    return next(req).pipe(
      delay(1000),
      finalize(() => {
        busyService.idle();
      })
    );
  }

  return next(req);
};
