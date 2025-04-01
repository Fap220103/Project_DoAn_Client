import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy.service';
import { inject } from '@angular/core';
import { delay, finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // const busyService = inject(BusyService);

  // busyService.busy();
  // return next(req).pipe(
  //     delay(1000),
  //     finalize(() => {
  //         busyService.idle();
  //     })
  // );
  const busyService = inject(BusyService);
  const startTime = Date.now(); // Lưu thời gian bắt đầu request
  let timeoutId: any;

  // Đặt timeout để hiện loading nếu request lâu hơn 1s
  timeoutId = setTimeout(() => {
    busyService.busy();
  }, 1000);

  return next(req).pipe(
    tap(() => {
      // Nếu request hoàn thành trước 1s thì không hiển thị loading
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1000) {
        clearTimeout(timeoutId);
      }
    }),
    finalize(() => {
      clearTimeout(timeoutId); // Xóa timeout nếu vẫn còn
      busyService.idle(); // Tắt loading khi request hoàn thành
    })
  );
};
