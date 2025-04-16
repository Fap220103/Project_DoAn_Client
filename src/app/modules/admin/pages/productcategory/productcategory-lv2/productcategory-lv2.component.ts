import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ProductcategoryService } from '../../../../../core/services/productcategory.service';
import { AddProductCategoryLv1Component } from '../productcategory-lv1/addProductCategory-lv1/addProductCategory-lv1.component';

@Component({
  selector: 'app-productcategory-lv2',
  templateUrl: './productcategory-lv2.component.html',
  styleUrls: ['./productcategory-lv2.component.scss']
})
export class ProductCategoryLv2Component implements OnInit, OnChanges {
  pageTitle: string = 'Danh muc';
  lstCategory1: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};
  level: number = 2;
  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  @Input() itemSelected: any = {};

  @Output() onSelectedLv2: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private toastr: ToastrService,
    private productCategoryService: ProductcategoryService,
    public dialog: MatDialog
  ) {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['itemSelected']?.currentValue) {
  //     this.selectedItem = changes['itemSelected']?.currentValue;
  //     this.params = {
  //       level: this.level,
  //       parentId: this.selectedItem.id,
  //     };
  //     this.getData();
  //   }
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemSelected'] && !changes['itemSelected'].firstChange) {
      this.selectedItem = changes['itemSelected'].currentValue;
      this.params = {
        level: this.level,
        parentId: this.selectedItem.id
      };
      this.getData();
    }
  }

  ngOnInit(): void {
    //this.getData();
  }
  getData() {
    this.productCategoryService
      .get(this.params, this.pageIndex + 1, this.pageSize)
      .subscribe((rs) => {
        this.lstCategory1 = rs.content.data.items;
        this.lstCategory1 = this.lstCategory1.map((x, index) => {
          x.position = this.pageIndex * this.pageSize + index + 1;
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
      });
    console.log(this.lstCategory1);
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  edit(item: any) {
    console.log(item);
    this.selectedItem = item;
    const dialogRef = this.dialog.open(AddProductCategoryLv1Component, {
      minWidth: '30%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Category.EditTitle',
        item: this.selectedItem,
        level: this.level,
        parentId: this.selectedItem.parentId,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  delete(categoryId: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productCategoryService.delete(categoryId).subscribe({
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
    const dialogRef = this.dialog.open(AddProductCategoryLv1Component, {
      minWidth: '30%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Category.AddTitle',
        parentId: this.selectedItem.parentId,
        level: this.level,
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  selectRow(item: any) {
    this.selectedItem = item;
    this.onSelectedLv2.emit(item);
  }
}
