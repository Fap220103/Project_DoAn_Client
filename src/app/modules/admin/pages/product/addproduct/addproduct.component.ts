import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../../../core/services/product.service';
import { PriceFields, optionsCheckbox } from '../../../../../core/constants/common';
import { ProductcategoryService } from '../../../../../core/services/productcategory.service';
import { forkJoin } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  activeTab = 'info';
  images: { url: string; file?: File; isDefault: boolean }[] = [];
  productCategories: any[] = [];
  priceFields = PriceFields;
  optionsCheckbox = optionsCheckbox;
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
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private categoryService: ProductcategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.form = this.fb.group({
      title: [''],
      alias: [''],
      productCode: [''],
      productCategoryId: [''],
      description: [''],
      detail: [''],
      price: [0],
      salePercent: [0],
      originalPrice: [0],
      isActive: [true],
      seoTitle: [''],
      seoDescription: [''],
      seoKeywords: ['']
    });
  }
  ngOnInit() {
    this.getLstProductCategories();
    console.log('list category: ', this.productCategories);
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
    const transForm = res ? (msg ? msg : 'Thêm mới thành công') : 'Thêm mới thất bại';

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
