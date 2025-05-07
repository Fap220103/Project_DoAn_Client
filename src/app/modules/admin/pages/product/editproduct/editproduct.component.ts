import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../../../core/services/product.service';
import { PriceFields, optionsCheckbox } from '../../../../../core/constants/common';
import { ProductcategoryService } from '../../../../../core/services/productcategory.service';
import { forkJoin } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from '../../../../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditProductComponent implements OnInit {
  rawValues: { [key: string]: string } = {};
  form: FormGroup;
  activeTab = 'info';
  images: { url: string; file?: File; isDefault: boolean }[] = [];
  productCategories: any[] = [];
  priceFields = PriceFields;
  optionsCheckbox = optionsCheckbox;
  userId!: string;
  isEdit: boolean;
  isDetail: boolean;
  item: any = {};
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'insertImage',
      'undo',
      'redo'
    ],
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    }
  };

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    private categoryService: ProductcategoryService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.userId = authService.getUserId();
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);
    data.isDetail ? (this.isDetail = true) : (this.isDetail = false);

    console.log('item edit product: ', this.item);
    this.form = this.fb.group({
      title: [this.item.title],
      alias: [this.item.alias],
      productCode: [this.item.productCode],
      productCategoryId: [this.item.productCategoryId],
      description: [this.item.description],
      detail: [this.item.detail],
      price: [this.item.price],
      salePercent: [this.item.salePercent],
      originalPrice: [this.item.originalPrice],
      isActive: [this.item.isActive],
      seoTitle: [this.item.seoTitle],
      seoDescription: [this.item.seoDescription],
      seoKeywords: [this.item.seoKeywords]
    });

    ['price', 'originalPrice'].forEach((field) => {
      const value = this.item[field];
      if (value) {
        this.rawValues[field] = value.toString();
        const formatted = Number(value).toLocaleString('en-US');
        this.form.get(field)?.setValue(formatted, { emitEvent: false });
      }
    });
  }
  ngOnInit() {
    this.getLstProductCategories();
  }

  getLstProductCategories() {
    forkJoin({
      lv2: this.categoryService.get({ level: 2, filter: 'true', IsHasChild: false }, 1, 100),
      lv3: this.categoryService.get({ level: 3 }, 1, 100)
    }).subscribe(({ lv2, lv3 }) => {
      const listLv2 = lv2.content.data.items.map((item: any) => ({
        id: item.id,
        title: item.title
      }));

      const listLv3 = lv3.content.data.items.map((item: any) => ({
        id: item.id,
        title: item.title
      }));

      this.productCategories = [...listLv2, ...listLv3];
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const formData = new FormData();
      formData.append('title', formValue.title);
      formData.append('alias', formValue.alias ?? '');
      formData.append('productCode', formValue.productCode ?? '');
      formData.append('productCategoryId', formValue.productCategoryId);
      formData.append('description', formValue.description);
      formData.append('detail', formValue.detail ?? '');
      formData.append('price', formValue.price);
      formData.append('salePercent', formValue.salePercent);
      formData.append('originalPrice', formValue.originalPrice);
      formData.append('isActive', formValue.isActive);
      formData.append('seoTitle', formValue.seoTitle ?? '');
      formData.append('seoDescription', formValue.seoDescription ?? '');
      formData.append('seoKeywords', formValue.seoKeywords ?? '');
      formData.append('UserId', this.userId);
      formData.append('ProductId', this.item.id);

      this.productService.put(formData).subscribe({
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
  }
  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.EditSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.EditFail');
    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
  formatCurrency(controlName: string) {
    let value = this.form.get(controlName)?.value;
    if (value) {
      value = value.replace(/[^0-9]/g, '');
      this.rawValues[controlName] = value; // lưu giá trị gốc
      const formatted = Number(value).toLocaleString('en-US');
      this.form.get(controlName)?.setValue(formatted, { emitEvent: false });
    }
  }

  removeFormat(controlName: string) {
    const raw =
      this.rawValues[controlName] || this.form.get(controlName)?.value?.replace(/[^0-9]/g, '');
    this.form.get(controlName)?.setValue(raw, { emitEvent: false });
  }
}
