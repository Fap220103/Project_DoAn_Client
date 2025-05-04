import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';
import { HttpClient } from '@angular/common/http';
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
    private toastr: ToastrService,
    private cartService: CartService,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // rememberMe: [false]
    });
  }

  ngOnInit() {}

  save() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Đăng nhập thành công', 'Thành công');

        const CartItem = localStorage.getItem('local_cart');
        const userId = this.authService.getUserId();
        if (CartItem) {
          const cartItems = JSON.parse(CartItem);
          const cartSync = {
            items: cartItems,
            userId: userId
          };
          this.cartService.syncCartWithServer(cartSync).subscribe({
            next: (rs) => {
              if (rs.code === 200) {
                localStorage.removeItem('local_cart');
                this.cartService.cartCount.next(rs.data.countCart);
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
                this.router.navigate([returnUrl]);
              } else {
                this.toastr.error('Đồng bộ giỏ hàng thất bại', 'Lỗi');
              }
            },
            error: () => {
              this.toastr.error('Đồng bộ giỏ hàng thất bại', 'Lỗi');
            }
          });
        } else {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigate([returnUrl]);
        }
      },
      error: (err) => {
        this.toastr.error('Đăng nhập thất bại', 'Lỗi');
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: (rs: any) => {
        if (rs.code === 200) {
          this.toastr.success('Đăng nhập Google thành công', 'Thành công');
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Đăng nhập Google thất bại', 'Lỗi');
        }
      },
      error: () => {
        this.toastr.error('Lỗi khi đăng nhập bằng Google', 'Lỗi');
      }
    });
  }
}
