import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetPassComponent implements OnInit {
  form!: FormGroup;
  email!: string;
  code!: string;
  isSuccess = false;
  errorMessage = '';
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.code = this.route.snapshot.queryParamMap.get('code') || '';

    if (!this.email || !this.code) {
      this.errorMessage = 'Invalid password reset link.';
      return;
    }

    this.form = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }
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
    return this.form.get('newPassword')!;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }
  save() {
    if (this.form.invalid) return;

    const newPassword = this.form.value.newPassword;
    this.authService.resetPassword(this.email, this.code, newPassword).subscribe({
      next: () => {
        this.isSuccess = true;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to reset password.';
      }
    });
  }
}
