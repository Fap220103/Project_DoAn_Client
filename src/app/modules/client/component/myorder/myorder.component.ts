import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from '../../../../core/services/order.service';
import { orderStatus } from '../../../../core/constants/common';
import { DatePipe } from '@angular/common';
import { OrderDetailComponent } from '../../../admin/pages/order/orderdetail/orderdetail.component';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyOrderComponent implements OnInit {
  lstStatus = orderStatus;
  lstOrder: any[] = [];
  addressOrder: any;
  orderDetail: any[] = [];
  searchString: string = '';
  status!: number;
  selectedItem: any = {};
  params: any = {};
  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private orderService: OrderService,
    private translate: TranslateService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.orderService
      .get({ userId: this.authService.getUserId() }, this.pageIndex + 1, this.pageSize)
      .subscribe((rs) => {
        this.lstOrder = rs.content.data.items;
        this.addressOrder = rs.content.data.items.address;
        this.orderDetail = rs.content.data.items.items;
        this.lstOrder = this.lstOrder.map((x, index) => {
          x.position = this.pageIndex * this.pageSize + index + 1;
          x.displayStatus = this.lstStatus.find((item) => item.id == x.status)?.display;
          x.createdDate = this.datePipe.transform(x.createdAt, 'dd/MM/yyyy, HH:mm:ss', 'UTC+7');
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
      });
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  delete(orderId: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel'),
      backdrop: true,
      position: 'center'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancelOrder({ orderId: orderId }).subscribe({
          next: (res) => {
            if (res.code === 200) {
              this.getData();
              this.processResponse(res);
            } else {
              this.processResponse(false);
            }
          },
          error: (err) => {
            this.processResponse(false);
          }
        });
      }
    });
  }
  detail(orderId: any) {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      width: '70vw',
      maxWidth: '100vw',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Setting.EditTitle',
        orderId: orderId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
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
}
