import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SizeService } from '../../../../core/services/size.service';
import { SizeAddComponent } from './size-add/size-add.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  pageTitle: string = 'Màu sắc';
  lstSize: any[] = [];
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
    private sizeService: SizeService,
    public dialog: MatDialog,) {

  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.sizeService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe(
      rs => {
        this.lstSize = rs.content.data;
        this.lstSize = this.lstSize.map((x, index) => {
          x.position = this.pageIndex * this.pageSize + index + 1;
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
      })
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  edit(item: any) {
    console.log(item);
    this.selectedItem = item;
    const dialogRef = this.dialog.open(SizeAddComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0',
      },
      data: {
        title: 'Size.EditTitle',
        item: this.selectedItem,
        isEdit: true,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
  delete(id: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sizeService.delete(id).subscribe({
          next: () => {
            this.getData();
            this.toastr.success("Xóa thành công!", "Thành công");
            
          },
          error: (err) => {
            this.toastr.error("Đã xảy ra lỗi khi xóa!", "Lỗi");
          }
        });
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(SizeAddComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0',
      },
      data: {
        title: 'Size.AddTitle',
        isEdit: false,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}
