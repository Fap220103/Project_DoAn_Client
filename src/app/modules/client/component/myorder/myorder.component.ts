import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from '../../../../core/services/order.service';
import { orderStatus, statusPayment } from '../../../../core/constants/common';
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
  lstStatusPayment = statusPayment;
  lstOrder: any[] = [];
  addressOrder: any;
  orderDetail: any[] = [];
  searchString: string = '';
  status!: number;
  selectedItem: any = {};
  params: any = {};
  totalCount!: number;
  currentPage = 1;
  pageSize = 10;

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
      .get({ userId: this.authService.getUserId() }, this.currentPage, this.pageSize)
      .subscribe((rs) => {
        this.lstOrder = rs.content.data.items;
        this.addressOrder = rs.content.data.items.address;
        this.orderDetail = rs.content.data.items.items;
        this.lstOrder = this.lstOrder.map((x, index) => {
          x.position = (this.currentPage - 1) * this.pageSize + index + 1;
          x.displayStatus = this.lstStatus.find((item) => item.id == x.status)?.display;
          x.displayStatusPayment = this.lstStatusPayment.find(
            (item) => item.id == x.statusPayment
          )?.display;
          const createdAt = new Date(x.createdAt + 'Z');
          x.createdDate = this.datePipe.transform(createdAt, 'dd/MM/yyyy, HH:mm:ss', '+0700');
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
      });
  }
  onPageChange(newPage: number) {
    this.currentPage = newPage;
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
      maxWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        left: '0'
      },
      data: {
        title: 'Order.Detail',
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
