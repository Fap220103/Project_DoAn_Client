import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  if (accountService.isTokenExpired()) {
    router.navigate(['/auth/login-admin']);
    return false;
  }
  return true;
};
