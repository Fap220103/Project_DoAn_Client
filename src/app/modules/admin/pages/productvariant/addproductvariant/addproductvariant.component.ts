import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductVariantService } from '../../../../../core/services/productvariant.service';
import { ProductService } from '../../../../../core/services/product.service';
import { ColorService } from '../../../../../core/services/color.service';
import { SizeService } from '../../../../../core/services/size.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addproductvariant',
  templateUrl: './addproductvariant.component.html',
  styleUrls: ['./addproductvariant.component.scss']
})
export class AddProductVariantComponent implements OnInit {
  form!: FormGroup;
  lstProduct: any[] = [];
  lstSize: any[] = [];
  lstColor: any[] = [];

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddProductVariantComponent>,
    private productVariantService: ProductVariantService,
    private productService: ProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.form = this.fb.group({
      productId: [''],
      sizeId: [[]],
      colorId: [[]]
    });
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
    this.getLstProduct();
    this.getLstColor();
    this.getLstSize();
  }

  getLstProduct() {
    this.productService.get({}, 1, 100).subscribe((rs) => {
      this.lstProduct = rs.content.data.items.map((item: any) => ({
        id: item.id,
        name: item.title,
        code: item.productCode
      }));
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

  save(): void {
    const formValue = this.form.value;
    const payload = {
      productId: formValue.productId,
      sizeId: formValue.sizeId,
      colorId: formValue.colorId
    };
    this.productVariantService.post(payload).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.processResponse(res);
        } else {
          this.processResponse(false);
        }
      },
      error: () => this.processResponse(false)
    });
  }
  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.AddSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.AddFail');
    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
