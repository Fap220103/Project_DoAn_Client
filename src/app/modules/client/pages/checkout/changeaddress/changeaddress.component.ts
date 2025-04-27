import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ShippingAddressService } from '../../../../../core/services/shippingaddress.service';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-changeaddress',
  templateUrl: './changeaddress.component.html',
  styleUrls: ['./changeaddress.component.scss']
})
export class ChangeAddressComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  lstAddress: any[] = [];
  selectedAddress: any;
  constructor(
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ChangeAddressComponent>,
    public addressService: ShippingAddressService,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
    this.getData();
  }

  getData() {
    this.addressService.get({ userId: this.authService.getUserId() }, 1, 10).subscribe((rs) => {
      this.lstAddress = rs.content.data.items;
      this.lstAddress = this.lstAddress.map((x, index) => {
        x.addressOrder = `${x.ward}, ${x.district}, ${x.province}`;
        return x;
      });
      if (this.data?.currentAddress) {
        // tìm item nào có id giống addressDefault để gán
        this.selectedAddress = this.lstAddress.find((x) => x.id === this.data.currentAddress.id);
      }
    });
  }

  save() {
    if (this.selectedAddress) {
      this.dialogRef.close(this.selectedAddress);
    } else {
      this.snackBar.open('Vui lòng chọn một địa chỉ', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    }
  }

  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.AddSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.EditSuccess');

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
