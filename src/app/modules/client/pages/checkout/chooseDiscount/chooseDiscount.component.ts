import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ShippingAddressService } from '../../../../../core/services/shippingaddress.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { DiscountService } from '../../../../../core/services/discount.service';

@Component({
  selector: 'app-chooseDiscount',
  templateUrl: './chooseDiscount.component.html',
  styleUrls: ['./chooseDiscount.component.scss']
})
export class ChooseDiscountComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  lstDiscount: any[] = [];
  selectedDiscount: any;
  constructor(
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ChooseDiscountComponent>,
    public discountService: DiscountService,
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
    this.discountService.getUserDiscount(this.authService.getUserId()).subscribe((rs) => {
      this.lstDiscount = rs.content.data.items;
      this.lstDiscount = this.lstDiscount.map((x, index) => {
        const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(
          x.discountValue
        );
        x.displayValue = x.discountType == 0 ? `${formattedValue}%` : `${formattedValue} VND`;
        return x;
      });
    });
  }

  save() {
    console.log(this.selectedDiscount);
    this.dialogRef.close(this.selectedDiscount);
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
