import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorService } from '../../../../../core/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.scss']
})
export class ColorAddComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  isEdit!: boolean;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ColorAddComponent>,
    private formBuilder: FormBuilder,
    public colorService: ColorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;

    this.form = this.formBuilder.group({
      colorName: new FormControl(
        this.item?.colorName,
        Validators.compose([Validators.required, Validators.maxLength(255)])
      ),
      colorCode: new FormControl(this.item?.colorCode, Validators.compose([Validators.required]))
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
    const addItem = {
      Name: formValue.colorName,
      hexCode: formValue.colorCode
    };
    console.log('add: ', addItem);
    this.colorService.post(addItem).subscribe({
      next: (res) => this.processResponse(res),
      error: () => this.processResponse(false)
    });
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
