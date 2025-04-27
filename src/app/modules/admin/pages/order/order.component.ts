import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AddSettingComponent } from '../setting/addSetting/addSetting.component';
import { OrderService } from '../../../../core/services/order.service';
import { orderStatus } from '../../../../core/constants/common';
import { DatePipe } from '@angular/common';
import { OrderDetailComponent } from './orderdetail/orderdetail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [DatePipe]
})
export class OrderComponent implements OnInit {
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
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
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
  edit(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(AddSettingComponent, {
      minWidth: '30%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Setting.EditTitle',
        item: this.selectedItem,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
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

  handleChangeStatus(event: any) {
    this.status = event;
    this.params = {
      status: this.status,
      search: this.searchString
    };
    this.getData();
  }
}
