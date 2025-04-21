import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductVariantComponent } from './addproductvariant/addproductvariant.component';
import { ProductVariantService } from '../../../../core/services/productvariant.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-productvariant',
  templateUrl: './productvariant.component.html',
  styleUrls: ['./productvariant.component.scss']
})
export class ProductVariantComponent implements OnInit {
  lstVariant: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};
  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productVariantService: ProductVariantService,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.productVariantService
      .get(this.params, this.pageIndex + 1, this.pageSize)
      .subscribe((rs) => {
        this.lstVariant = rs.content.data;
        this.lstVariant = this.lstVariant.map((x, index) => {
          x.position = this.pageIndex * this.pageSize + index + 1;
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
      });
    console.log(this.lstVariant);
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }

  delete(settingId: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.productVariantService.delete(settingId).subscribe({
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
    const dialogRef = this.dialog.open(AddProductVariantComponent, {
      minWidth: '30%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'ProductVatiant.AddTitle',
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
