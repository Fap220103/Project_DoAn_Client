import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formError = '';
  externalProviders: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // rememberMe: [false]
    });
  }

  ngOnInit() {
    // Lấy danh sách các nhà cung cấp đăng nhập bên ngoài từ backend
    // this.authService.getExternalProviders().subscribe({
    //   next: (providers) => this.externalProviders = providers,
    //   error: (err) => console.error('Lỗi khi lấy danh sách nhà cung cấp:', err)
    // });
  }

  save() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Đăng nhập thành công', 'Thành công');
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        this.toastr.error('Đăng nhập thất bại', 'Lỗi');
      }
    });
  }

  externalLogin(provider: string) {
    // this.authService.externalLogin(provider);
  }
}
