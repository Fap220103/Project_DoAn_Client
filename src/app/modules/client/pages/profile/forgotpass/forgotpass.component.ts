import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit() {}

  save() {
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.submitted = true;
          this.message = 'Một email đã được gửi để đặt lại mật khẩu!';
        } else {
          this.processResponse(false,res.message);
        }
      },
      error: () => {
        this.message = 'Gửi thất bại. Vui lòng kiểm tra email!';
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
