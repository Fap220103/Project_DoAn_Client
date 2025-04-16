import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from '../../../../../core/services/setting.service';

@Component({
  selector: 'app-addSetting',
  templateUrl: './addSetting.component.html',
  styleUrls: ['./addSetting.component.scss']
})
export class AddSettingComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  isEdit!: boolean;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddSettingComponent>,
    private formBuilder: FormBuilder,
    public settingService: SettingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);
    this.form = this.formBuilder.group({
      key: new FormControl(
        this.item?.key,
        Validators.compose([Validators.required, Validators.maxLength(255)])
      ),
      value: new FormControl(this.item?.value, Validators.compose([Validators.required]))
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
        key: formValue.key,
        value: formValue.value
      };
      this.settingService.post(updateItem).subscribe({
        next: (res) => this.processResponse(res),
        error: () => this.processResponse(false)
      });
    } else {
      const addItem = {
        key: formValue.key,
        value: formValue.value
      };
      this.settingService.post(addItem).subscribe({
        next: (res) => this.processResponse(res),
        error: () => this.processResponse(false)
      });
    }
  }

  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res
      ? !this.isEdit
        ? msg
          ? msg
          : 'Thêm mới thành công'
        : msg
          ? msg
          : 'Cập nhật thành công'
      : !this.isEdit
        ? msg
          ? msg
          : 'Thêm mới thất bại'
        : msg
          ? msg
          : 'Cập nhật thất bại';
    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
