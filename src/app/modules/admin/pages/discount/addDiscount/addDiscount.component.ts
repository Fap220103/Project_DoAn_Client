import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from '../../../../../core/services/setting.service';
import { TranslateService } from '@ngx-translate/core';
import { DiscountService } from '../../../../../core/services/discount.service';

@Component({
  selector: 'app-addDiscount',
  templateUrl: './addDiscount.component.html',
  styleUrls: ['./addDiscount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  isEdit!: boolean;
  constructor(
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddDiscountComponent>,
    private fb: FormBuilder,
    public discountService: DiscountService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);
    this.form = this.fb.group({
      code: [this.item?.code, Validators.required],
      title: [this.item?.title, Validators.required],
      description: [this.item?.description],
      discountType: [this.item?.discountType, Validators.required],
      discountValue: [this.item?.discountValue, Validators.required],
      endDate: [this.item?.endDate, Validators.required],
      usageLimit: [this.item?.usageLimit],
      isActive: new FormControl(this.item?.isActive)
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
        code: formValue.code,
        title: formValue.title,
        description: formValue.description,
        discountType: formValue.discountType,
        discountValue: formValue.discountValue,
        endDate: formValue.endDate,
        usageLimit: formValue.usageLimit,
        isActive: formValue.isActive
      };
      this.discountService.put(updateItem).subscribe({
        next: (res) => this.processResponse(res),
        error: () => this.processResponse(false)
      });
    } else {
      const addItem = {
        code: formValue.code,
        title: formValue.title,
        description: formValue.description,
        discountType: formValue.discountType,
        discountValue: formValue.discountValue,
        endDate: formValue.endDate,
        usageLimit: formValue.usageLimit
      };
      console.log('add discount: ', addItem);
      this.discountService.post(addItem).subscribe({
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
