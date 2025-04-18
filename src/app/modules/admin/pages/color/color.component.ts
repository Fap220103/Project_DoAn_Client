import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../../../core/services/color.service';
import { MatDialog } from '@angular/material/dialog';
import { ColorAddComponent } from './color-add/color-add.component';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  pageTitle: string = 'Màu sắc';
  lstColor: any[] = [];
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
    private colorService: ColorService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.colorService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstColor = rs.content.data.items;
      this.lstColor = this.lstColor.map((x, index) => {
        x.position = this.pageIndex * this.pageSize + index + 1;
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
    console.log(item);
    this.selectedItem = item;
    const dialogRef = this.dialog.open(ColorAddComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Color.EditTitle',
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
        this.colorService.delete(colorId).subscribe({
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
    const dialogRef = this.dialog.open(ColorAddComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Color.AddTitle',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  handleChangeSearchInput(event: any) {
    if (event.key === 'Enter') {
      this.params = {
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
      search: this.searchString
    };
    this.getData();
  }
}
