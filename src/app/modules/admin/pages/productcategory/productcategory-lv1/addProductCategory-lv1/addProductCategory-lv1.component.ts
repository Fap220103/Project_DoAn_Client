import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductcategoryService } from '../../../../../../core/services/productcategory.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addProductCategory-lv1',
  templateUrl: './addProductCategory-lv1.component.html',
  styleUrls: ['./addProductCategory-lv1.component.scss']
})
export class AddProductCategoryLv1Component implements OnInit {
  form!: FormGroup;
  item: any = {};
  isEdit!: boolean;
  level: number = 1;
  parentId!: string;
  constructor(
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddProductCategoryLv1Component>,
    private formBuilder: FormBuilder,
    public productCategoryService: ProductcategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);

    this.level = data.level;
    this.parentId = data.parentId;
    this.form = this.formBuilder.group({
      title: new FormControl(
        this.item?.title,
        Validators.compose([Validators.required, Validators.maxLength(255)])
      ),
      alias: new FormControl(this.item?.alias),
      description: new FormControl(this.item?.description),
      isActive: new FormControl(this.item?.isActive),
      link: new FormControl(this.item?.link)
    });
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
  }

  save() {
    const formValue = this.form.value;
    if (this.isEdit) {
      const updateItem = {
        id: this.item.id,
        title: formValue.title,
        alias: formValue.alias,
        description: formValue.description,
        level: this.level,
        isActive: formValue.isActive,
        parentId: this.parentId,
        link: formValue.link
      };
      this.productCategoryService.updateCategory(updateItem).subscribe({
        next: (res) => {
          if (res.code === 200) {
            this.processResponse(res);
          } else {
            this.processResponse(false);
          }
        },
        error: () => this.processResponse(false)
      });
    } else {
      const addItem = {
        title: formValue.title,
        alias: formValue.alias,
        description: formValue.description,
        level: this.level,
        isActive: formValue.isActive,
        parentId: this.parentId,
        link: formValue.link
      };
      this.productCategoryService.createCategory(addItem).subscribe({
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
      ? !this.isEdit
        ? msg
          ? msg
          : this.translate.instant('Message.AddSuccess')
        : msg
          ? msg
          : this.translate.instant('Message.EditSuccess')
      : !this.isEdit
        ? msg
          ? msg
          : this.translate.instant('Message.AddFail')
        : msg
          ? msg
          : this.translate.instant('Message.EditFail');
    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
