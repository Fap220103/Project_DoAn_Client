import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../core/services/user.service';
import { RolesObj, RoleType } from '../../../../../core/constants/roles';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  lstRole = RolesObj;
  formError: string | null = null;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
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
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ onlySelf: true });
    });

    this.form.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ onlySelf: true });
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
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.snackBar.open('Vui lòng kiểm tra và điền đầy đủ thông tin hợp lệ.', 'OK', {
          verticalPosition: 'bottom',
          duration: 3000
        });
        return;
      }
      return;
    }
    const formValue = this.form.value;
    const addItem = {
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      roles: formValue.roles
    };
    this.userService.post(addItem).subscribe({
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
    const transForm = res ? (msg ? msg : 'Thêm mới thành công') : 'Thêm mới thất bại';

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
