import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  return accountService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true; 
      }   
      router.navigate(['/auth/login-admin']);
      return false; 
    })
  )
};
