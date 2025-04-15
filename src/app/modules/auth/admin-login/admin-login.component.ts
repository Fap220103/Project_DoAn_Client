import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // rememberMe: [false]
    });
  }

  ngOnInit() {}
  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Đăng nhập thành công', 'Thành công');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.toastr.error('Đăng nhập thất bại', 'Lỗi');
      }
    });
  }
}
