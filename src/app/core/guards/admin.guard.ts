import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  } else {
    alert('Bạn không có quyền truy cập!');
    router.navigate(['/unauthorized']); // hoặc redirect về trang chính
    return false;
  }
};
