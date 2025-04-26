import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangePassComponent implements OnInit {
  changePassForm: FormGroup;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router,
    private userService: UserService
  ) {
    this.changePassForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }
  get password() {
    return this.changePassForm.get('newPassword')!;
  }

  get confirmPassword() {
    return this.changePassForm.get('confirmPassword')!;
  }

  save(): void {
    if (this.changePassForm.invalid) {
      return;
    }
    const value = {
      currentPass: this.changePassForm.value.oldPassword,
      newPass: this.changePassForm.value.newPassword,
      userId: this.authService.getUserId()
    };
    this.userService.changePass(value).subscribe({
      next: (res: any) => {
        if (res.content.success === true) {
          this.processResponse(res);
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.processResponse(false);
        }
      },
      error: () => {
        this.processResponse(false);
      }
    });
  }
  processResponse(res: any, msg?: string) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.DeleteSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.DeleteFail');
    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
}
