import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isTokenExpired()) {
    router.navigate(['/auth/login-admin']);
    return false;
  }

  
  // const role = authService.getUserRole(); 
  // if (role !== 'Admin' && role !== 'Staff') {
  //   router.navigate(['/not-found']);
  //   return false;
  // }


  return true;
};
