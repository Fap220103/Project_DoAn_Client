import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../core/services/user.service';
import { RolesObj, RoleType } from '../../../../../core/constants/roles';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  lstRole = RolesObj;
  item: any = {};
  isEdit: boolean;
  selectedFile!: File;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;

    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        image: ['', Validators.required],
        roles: [[], Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onRoleChange(event: any, role: string) {
    const roles: string[] = this.form.get('roles')?.value || [];
    if (event.checked) {
      if (!roles.includes(role)) {
        roles.push(role);
      }
    } else {
      const index = roles.indexOf(role);
      if (index >= 0) {
        roles.splice(index, 1);
      }
    }
    this.form.get('roles')?.setValue(roles);
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  save() {
    const formValue = this.form.value;
    const formData = new FormData();

    formData.append('email', formValue.email);
    formData.append('userName', formValue.userName);
    formData.append('phoneNumber', formValue.phoneNumber);
    formData.append('roles', JSON.stringify(formValue.roles));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    console.log('form data: ', formData);
    // this.userService.put(formData).subscribe({
    //   next: (res) => this.processResponse(res),
    //   error: () => this.processResponse(false)
    // });
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
