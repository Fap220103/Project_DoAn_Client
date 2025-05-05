import { discountType } from './../../../../core/constants/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { orderStatus } from '../../../../core/constants/common';
import { DiscountService } from '../../../../core/services/discount.service';
import { AddDiscountComponent } from './addDiscount/addDiscount.component';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  lstStatus = orderStatus;
  lstDiscount: any[] = [];
  discountType = discountType;
  expandedRows: { [key: number]: boolean } = {};
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
    private discountService: DiscountService,
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    public datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.discountService
      .getDiscountAdmin(this.params, this.pageIndex + 1, this.pageSize)
      .subscribe((rs) => {
        this.lstDiscount = rs.content.data.items;
        this.lstDiscount = this.lstDiscount.map((x, index) => {
          x.position = this.pageIndex * this.pageSize + index + 1;
          x.displayType = this.discountType.find((item) => item.value == x.discountType)?.display;
          const startDate = new Date(x.startDate + 'Z');
          x.startDate = this.datePipe.transform(startDate, 'dd/MM/yyyy, HH:mm:ss', '+0700');
          const endDate = new Date(x.endDate + 'Z');
          x.endDate = this.datePipe.transform(endDate, 'dd/MM/yyyy, HH:mm:ss', '+0700');
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
      });
  }
  toggleRow(index: number) {
    this.expandedRows[index] = !this.expandedRows[index];
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  edit(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(AddDiscountComponent, {
      minWidth: '50%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Discount.EditTitle',
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

  add() {
    const dialogRef = this.dialog.open(AddDiscountComponent, {
      minWidth: '50%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Discount.AddTitle',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  delete(discountId: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.discountService.delete(discountId).subscribe({
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
