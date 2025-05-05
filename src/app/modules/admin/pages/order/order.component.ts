import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AddSettingComponent } from '../setting/addSetting/addSetting.component';
import { OrderService } from '../../../../core/services/order.service';
import { orderStatus, paymentType } from '../../../../core/constants/common';
import { DatePipe } from '@angular/common';
import { OrderDetailComponent } from './orderdetail/orderdetail.component';
import { ChangeOrderStatusComponent } from './changestatus/changestatus.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [DatePipe]
})
export class OrderComponent implements OnInit {
  lstStatus = orderStatus;
  lstPayment = paymentType;
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
  fromDate: string = '';
  toDate: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private orderService: OrderService,
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.orderService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstOrder = rs.content.data.items;
      this.addressOrder = rs.content.data.items.address;
      this.orderDetail = rs.content.data.items.items;
      this.lstOrder = this.lstOrder.map((x, index) => {
        x.position = this.pageIndex * this.pageSize + index + 1;
        x.displayStatus = this.lstStatus.find((item) => item.id == x.status)?.display;
        const createdAt = new Date(x.createdAt + 'Z');
        x.createdDate = this.datePipe.transform(createdAt, 'dd/MM/yyyy, HH:mm:ss', '+0700');
        x.displayPayment = this.lstPayment.find((item) => item.value == x.typePayment)?.display;
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

  updateStatus(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(ChangeOrderStatusComponent, {
      width: '400px',
      data: {
        item: this.selectedItem
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updateItem = {
          orderId: item.orderId,
          status: result
        };
        this.orderService.changeOrderStatus(updateItem).subscribe({
          next: (res) => {
            if (res.code === 200) {
              this.getData();
              this.processResponse(res, 'Cập nhật trạng thái thành công');
            } else {
              this.processResponse(false, 'Cập nhật trạng thái thất bại');
            }
          },
          error: (err) => {
            this.processResponse(false, 'Cập nhật trạng thái thất bại');
          }
        });
        //this.updateOrderStatus(result); // Cập nhật trạng thái mới cho đơn hàng
      }
    });
  }
  detail(orderId: any) {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
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
  handleChangeSearchInput(event: any) {
    if (event.key === 'Enter') {
      this.params = {
        status: this.status,
        search: this.searchString,
        fromDate: this.fromDate,
        toDate: this.toDate
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
      search: this.searchString,
      fromDate: this.fromDate,
      toDate: this.toDate
    };
    this.getData();
  }

  handleChangeStatus(event: any) {
    this.status = event;
    this.params = {
      status: this.status,
      search: this.searchString,
      fromDate: this.fromDate,
      toDate: this.toDate
    };
    this.getData();
  }
  goToInvoice(orderId: string) {
    this.router.navigate(['/admin/invoice', orderId]);
  }
  handleChangeDate() {
    this.params = {
      status: this.status,
      search: this.searchString,
      fromDate: this.fromDate,
      toDate: this.toDate
    };
    this.getData();
  }
}
