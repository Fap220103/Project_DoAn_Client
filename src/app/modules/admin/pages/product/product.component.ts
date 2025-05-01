import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../../core/services/product.service';
import Swal from 'sweetalert2';
import { EditProductComponent } from './editproduct/editproduct.component';
import { AddProductComponent } from './addproduct/addproduct.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditImageProductComponent } from './editimageproduct/editimageproduct.component';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../../core/constants/constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  pageTitle: string = 'Sản phẩm';
  lstProduct: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};

  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  currentUserId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.currentUserId = authService.getUserId();
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.productService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstProduct = rs.content.data.items;
      this.lstProduct = this.lstProduct.map((x, index) => {
        x.position = this.pageIndex * this.pageSize + index + 1;
        x.imageDefault = x.imageDefault || '/assets/Content/img/SanPham/h0.png';

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
    const dialogRef = this.dialog.open(EditProductComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Product.EditTitle',
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
  delete(productId: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(this.currentUserId, productId).subscribe({
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
    const dialogRef = this.dialog.open(AddProductComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Product.AddTitle',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  detail(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(EditProductComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Product.ReadTitle',
        item: this.selectedItem,
        isEdit: true,
        isDetail: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  editImage(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(EditImageProductComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'Product.EditTitle',
        productId: this.selectedItem.id
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.importExcel(file);
      input.value = '';
    }
  }

  importExcel(file: File) {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // key 'file' phải trùng với tên tham số trong API

    this.http.post(`${Constants.ApiResources}api/product/import`, formData).subscribe({
      next: (res: any) => {
        const msg = res?.message || 'Import thành công';
        this.snackBar.open(msg, 'OK', { duration: 2000 });
        this.getData();
      },
      error: (err) => {
        console.error(err);
        const msg = err?.error?.file?.[0] || 'Import thất bại';
        this.snackBar.open(msg, 'OK', { duration: 3000 });
      }
    });
  }

  exportExcel() {
    this.productService.exportToExcel();
  }
}
