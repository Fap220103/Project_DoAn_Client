import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SizeService } from '../../../../../core/services/size.service';

@Component({
  selector: 'app-size-add',
  templateUrl: './size-add.component.html',
  styleUrls: ['./size-add.component.scss']
})
export class SizeAddComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  isEdit!: boolean;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SizeAddComponent>,
    private formBuilder: FormBuilder,
    public sizeService: SizeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);
    this.form = this.formBuilder.group({
      sizeName: new FormControl(
        this.item?.sizeName,
        Validators.compose([Validators.required, Validators.maxLength(255)])
      )
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
        sizeName: formValue.sizeName
      };
      console.log('update:', updateItem);
      this.sizeService.post(updateItem).subscribe({
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
        Name: formValue.sizeName
      };
      console.log('add: ', addItem);
      this.sizeService.post(addItem).subscribe({
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
