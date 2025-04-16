import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SettingService } from '../../../../core/services/setting.service';
import { AddSettingComponent } from './addSetting/addSetting.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  pageTitle: string = 'Cài đặt';
  lstSetting: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};

  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private toastr: ToastrService,
    private settingService: SettingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.settingService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstSetting = rs.content.data;
      this.lstSetting = this.lstSetting.map((x, index) => {
        x.position = this.pageIndex * this.pageSize + index + 1;
        return x;
      });
      this.totalCount = rs.content.data.totalRecords;
    });
    console.log(this.lstSetting);
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  edit(item: any) {
    console.log(item);
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
  delete(colorId: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingService.delete(colorId).subscribe({
          next: () => {
            this.getData();
            this.toastr.success('Xóa thành công!', 'Thành công');
          },
          error: (err) => {
            this.toastr.error('Đã xảy ra lỗi khi xóa!', 'Lỗi');
          }
        });
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(AddSettingComponent, {
      minWidth: '30%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Setting.AddTitle',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
}
