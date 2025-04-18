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
        password: ['', Validators.required, Validators.minLength(6)],
        confirmPassword: ['', Validators.required],
        roles: [[]]
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
  save() {
    const formValue = this.form.value;
    const addItem = {
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      roles: formValue.roles
    };
    console.log('add: ', addItem);
    this.userService.post(addItem).subscribe({
      next: (res) => this.processResponse(res),
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
}
