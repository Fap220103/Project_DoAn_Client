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
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private translate: TranslateService,
    private productCategoryService: ProductcategoryService,
    public snackBar: MatSnackBar,
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
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  edit(item: any) {
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
        parentId: this.itemSelected.id,
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
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.productCategoryService.delete(categoryId).subscribe({
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
        parentId: this.itemSelected.id,
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
