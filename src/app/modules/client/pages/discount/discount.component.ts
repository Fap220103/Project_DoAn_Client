import { discountType } from './../../../../core/constants/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { orderStatus } from '../../../../core/constants/common';
import { DiscountService } from '../../../../core/services/discount.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  lstStatus = orderStatus;
  lstDiscount: any[] = [];
  discountType = discountType;
  searchString: string = '';
  status!: number;
  selectedItem: any = {};
  params: any = {};
  totalCount = 0;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [5, 10, 20, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private discountService: DiscountService,
    private translate: TranslateService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  checkHasSavedDiscount(discountId: string) {
    this.discountService
      .getStatusUserDiscount(this.authService.getUserId(), discountId)
      .subscribe((rs) => {
        return rs.content.data;
      });
  }
  getData() {
    this.discountService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      const rawDiscounts = rs.content.data.items;
      this.totalCount = rs.content.data.totalRecords;

      // Duyệt từng coupon để format và check trạng thái đã lưu
      const userId = this.authService.getUserId();

      const checkDiscounts = rawDiscounts.map(async (x: any, index: number) => {
        x.displayType = this.discountType.find((item) => item.value == x.discountType)?.display;
        const formattedValue = new Intl.NumberFormat('vi-VN').format(x.discountValue);
        x.displayValue = x.discountType == 0 ? `${formattedValue} %` : `${formattedValue} VND`;

        // Gọi API kiểm tra trạng thái đã lưu
        const result = await this.discountService.getStatusUserDiscount(userId, x.id).toPromise();
        x.hasSaved = result.content.data;
        return x;
      });

      // Chờ tất cả async xong
      Promise.all(checkDiscounts).then((result) => {
        this.lstDiscount = result;
      });
    });
  }

  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  save(coupon: any) {
    const addItem = {
      userId: this.authService.getUserId(),
      discountId: coupon.id
    };
    this.discountService.addUserDiscount(addItem).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          coupon.hasSaved = true;

          this.processResponse(res, 'Đã lưu mã khuyến mãi thành công');
        } else {
          this.processResponse(false, 'Bạn đã lưu mã khuyến mãi này rồi');
        }
      },
      error: () => {
        this.processResponse(false, 'Lưu mã khuyến mãi thất bại');
      }
    });
  }
  processResponse(res: any, msg?: string) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.DeleteSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.DeleteFail');

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
  handleChangeSearchInput(event: any) {
    if (event.key === 'Enter') {
      this.params = {
        status: this.status,
        search: this.searchString
      };
      this.getData();
    } else {
      this.searchString = (event.target.value ?? '').trim();
    }
  }

  handleClearSearchInput() {
    this.searchString = '';
    this.params = {
      status: this.status,
      search: this.searchString
    };
    this.getData();
  }
}
