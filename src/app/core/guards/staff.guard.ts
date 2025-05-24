import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const staffGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);

  if (authService.isStaff()) {
    return true;
  } else {
    router.navigate(['/not-found'], { queryParams: { returnUrl: '/admin/dashboard' } });
    toastrService.error('Bạn không có quyền truy cập trang này', 'Thông báo');
    return false;
  }
};
