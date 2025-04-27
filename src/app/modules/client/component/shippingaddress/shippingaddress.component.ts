import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { SettingService } from '../../../../core/services/setting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ShippingAddressService } from '../../../../core/services/shippingaddress.service';
import { AddSettingComponent } from '../../../admin/pages/setting/addSetting/addSetting.component';
import { AuthService } from '../../../../core/services/auth.service';
import { AddAddressComponent } from './addaddress/addaddress.component';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  lstAddress: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private addressService: ShippingAddressService,
    private authService: AuthService,
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.addressService.get({ userId: this.authService.getUserId() }, 1, 10).subscribe((rs) => {
      this.lstAddress = rs.content.data.items;
      this.lstAddress = this.lstAddress.map((x, index) => {
        x.addressOrder = `${x.ward}, ${x.district}, ${x.province}`;
        return x;
      });
    });
  }

  edit(item: any) {
    this.selectedItem = item;
    console.log('selected item: ', this.selectedItem);
    const dialogRef = this.dialog.open(AddAddressComponent, {
      position: {
        right: '0'
      },
      data: {
        title: 'ShippingAddress.EditTitle',
        item: this.selectedItem,
        userId: this.selectedItem.userId,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  delete(Id: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel'),
      backdrop: true,
      position: 'center'
    }).then((result) => {
      if (result.isConfirmed) {
        this.addressService.delete(Id).subscribe({
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
    const dialogRef = this.dialog.open(AddAddressComponent, {
      position: {
        right: '0'
      },
      data: {
        title: 'ShippingAddress.AddTitle',
        isEdit: false,
        userId: this.authService.getUserId()
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  changeDefault(id: string) {
    const itemDefault = {
      id: id,
      customerId: this.authService.getUserId()
    };
    this.addressService.put(itemDefault).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.getData();
          this.processResponse(res, 'Thiết lập mặc định thành công');
        } else {
          this.processResponse(false, 'Thiết lập mặc định thất bại');
        }
      },
      error: () => this.processResponse(false, 'Thiết lập mặc định thất bại')
    });
  }
}
