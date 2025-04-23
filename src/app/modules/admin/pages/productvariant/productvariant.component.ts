import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductVariantComponent } from './addproductvariant/addproductvariant.component';
import { ProductVariantService } from '../../../../core/services/productvariant.service';
import { TranslateService } from '@ngx-translate/core';
import { AddInventoryComponent } from './addinventory/addinventory.component';
import { InventoryService } from '../../../../core/services/inventory.service';
import { ColorService } from '../../../../core/services/color.service';
import { SizeService } from '../../../../core/services/size.service';

@Component({
  selector: 'app-productvariant',
  templateUrl: './productvariant.component.html',
  styleUrls: ['./productvariant.component.scss']
})
export class ProductVariantComponent implements OnInit {
  lstVariant: any[] = [];
  lstSize: any[] = [];
  lstColor: any[] = [];
  searchString: string = '';
  color: any;
  size: any;
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
    private inventoryService: InventoryService,
    private colorService: ColorService,
    private sizeService: SizeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getLstColor();
    this.getLstSize();
  }
  getData() {
    this.productVariantService
      .get(this.params, this.pageIndex + 1, this.pageSize)
      .subscribe((rs) => {
        this.lstVariant = rs.content.data.items;
        this.lstVariant = this.lstVariant.map((x, index) => {
          x.position = this.pageIndex * this.pageSize + index + 1;
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
      });
  }
  getLstColor() {
    this.colorService.get({}, 1, 100).subscribe((rs) => {
      this.lstColor = rs.content.data.items.map((item: any) => ({
        id: item.id,
        name: item.name
      }));
    });
  }
  getLstSize() {
    this.sizeService.get({}, 1, 100).subscribe((rs) => {
      this.lstSize = rs.content.data.map((item: any) => ({
        id: item.id,
        name: item.name
      }));
    });
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }

  delete(variantId: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.productVariantService.delete(variantId).subscribe({
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
  addStock(id: string) {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      width: '300px',
      data: { quantity: 1 } // default
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const payload = {
          ProductVariantId: id,
          Quantity: result
        };
        // Gọi API cập nhật số lượng ở đây
        this.productVariantService.addStock(payload).subscribe({
          next: (res) => {
            if (res.code === 200) {
              this.getData();
              this.processResponse(res, 'Thêm tồn kho thành công');
            } else {
              this.processResponse(false, 'Thêm tồn kho thất bại');
            }
          },
          error: () => this.processResponse(false, 'Thêm tồn kho thất bại')
        });
      }
    });
  }
  handleChangeSearchInput(event: any) {
    if (event.key === 'Enter') {
      this.params = {
        colorId: this.color,
        search: this.searchString,
        sizeId: this.size
      };
      this.getData();
    } else {
      this.searchString = (event.target.value ?? '').trim();
    }
  }

  handleClearSearchInput() {
    this.searchString = '';
    this.params = {
      colorId: this.color,
      search: this.searchString,
      sizeId: this.size
    };
    this.getData();
  }

  handleChangeColor(event: any) {
    this.color = event;
    this.params = {
      colorId: this.color,
      search: this.searchString,
      sizeId: this.size
    };
    this.getData();
  }
  handleChangeSize(event: any) {
    this.size = event;
    this.params = {
      colorId: this.color,
      search: this.searchString,
      sizeId: this.size
    };
    this.getData();
  }
}
