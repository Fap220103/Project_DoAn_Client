import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductVariantService } from '../../../../core/services/productvariant.service';
import { TranslateService } from '@ngx-translate/core';
import { InventoryService } from '../../../../core/services/inventory.service';
import { AddQuantityComponent } from './addquantity/addquantity.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  lstInventory: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};
  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private inventoryService: InventoryService,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.inventoryService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstInventory = rs.content.data.items;
      this.lstInventory = this.lstInventory.map((x, index) => {
        x.position = this.pageIndex * this.pageSize + index + 1;
        return x;
      });
      this.totalCount = rs.content.data.totalRecords;
    });
    console.log(this.lstInventory);
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }

  delete(settingId: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventoryService.delete(settingId).subscribe({
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

  addQuantity(id: string) {
    const dialogRef = this.dialog.open(AddQuantityComponent, {
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
        this.inventoryService.post(payload).subscribe({
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
}
