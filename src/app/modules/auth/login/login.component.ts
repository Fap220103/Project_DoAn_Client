import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formError = '';
  externalProviders: string[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Lấy danh sách các nhà cung cấp đăng nhập bên ngoài từ backend
    // this.authService.getExternalProviders().subscribe({
    //   next: (providers) => this.externalProviders = providers,
    //   error: (err) => console.error('Lỗi khi lấy danh sách nhà cung cấp:', err)
    // });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password, rememberMe } = this.loginForm.value;
    // this.authService.login(email, password, rememberMe).subscribe({
    //   next: () => {
    //     // Xử lý sau khi đăng nhập thành công
    //   },
    //   error: (err) => {
    //     this.formError = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
    //     console.error('Lỗi đăng nhập:', err);
    //   }
    // });
  }

  externalLogin(provider: string) {
    // this.authService.externalLogin(provider);
  }
}
