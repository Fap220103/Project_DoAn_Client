import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../../../core/services/product.service';
import { PriceFields, optionsCheckbox } from '../../../../../core/constants/common';
import { ProductcategoryService } from '../../../../../core/services/productcategory.service';
import { forkJoin } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddProductComponent implements OnInit {
  rawValues: { [key: string]: string } = {};
  form: FormGroup;
  activeTab = 'info';
  images: { url: string; file?: File; isDefault: boolean }[] = [];
  productCategories: any[] = [];
  priceFields = PriceFields;
  optionsCheckbox = optionsCheckbox;
  item: any = {};
  displayAdvanceAmount = '';
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
    public dialogRef: MatDialogRef<AddProductComponent>,
    private categoryService: ProductcategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.form = this.fb.group({
      title: ['', Validators.required],
      alias: [''],
      productCode: ['', Validators.required],
      productCategoryId: ['', Validators.required],
      description: [''],
      detail: [''],
      price: [],
      salePercent: [
        this.item.salePercent,
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      originalPrice: [],
      isActive: [true],
      seoTitle: [''],
      seoDescription: [''],
      seoKeywords: ['']
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

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push({
          url: reader.result as string,
          file: file,
          isDefault: false
        });
      };
      reader.readAsDataURL(file);
    }
  }

  setDefaultImage(index: number) {
    this.images.forEach((img, i) => (img.isDefault = i === index));
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const formData = new FormData();
      console.log('price', formValue.price.replace(/,/g, ''));
      console.log('original price', formValue.originalPrice.replace(/,/g, ''));
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
      formData.append('seoTitle', formValue.seoTitle);
      formData.append('seoDescription', formValue.seoDescription);
      formData.append('seoKeywords', formValue.seoKeywords);
      this.images.forEach((img, i) => {
        if (img.file) {
          formData.append('Images', img.file);
        }
        formData.append('Default', img.isDefault ? '1' : '0');
      });

      this.productService.post(formData).subscribe({
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
  // Hàm format số thành chuỗi 100,000
  formatNumber(value: string): string {
    const number = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(number)) return '';
    return number.toLocaleString('en-US');
  }

  // Xử lý khi người dùng nhập số (ngăn chữ + format tiền)
  onNumberInput(controlName: 'price' | 'originalPrice', event: Event) {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/[^0-9]/g, '');
    const formatted = this.formatNumber(rawValue);
    this.form.get(controlName)?.setValue(formatted, { emitEvent: false });
  }

  // Ngăn nhập chữ ở trường salePercent
  onPercentInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/[^0-9]/g, '');
    this.form.get('salePercent')?.setValue(rawValue, { emitEvent: false });
  }
}
