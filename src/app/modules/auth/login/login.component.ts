import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  formError = '';

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
    });
  }

  ngOnInit() {
    google.accounts.id.initialize({
      client_id: '844092088565-2t5ova2mof86otbptvm6loqoibenmpek.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response),
      ux_mode: 'popup',
      use_fedcm_for_prompt: false
    });

    google.accounts.id.renderButton(document.getElementById('googleSignInButton'), {
      type: 'standard',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular'
    });
  }

  ngAfterViewInit() {
    const googleButton = document.getElementById('googleSignInButton');
    if (googleButton) {
      google.accounts.id.renderButton(googleButton, {
        type: 'standard',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular'
      });
    }
  }

  private handleGoogleLogin(response: any) {
    const idToken = response.credential;
    this.authService.loginWithGoogle(idToken).subscribe({
      next: (rs: any) => {
        if (rs.code === 200) {
          this.toastr.success('Đăng nhập Google thành công', 'Thành công');
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigate([returnUrl]);
        } else {
          console.error('Lỗi từ server:', rs);
          this.toastr.error('Đăng nhập Google thất bại', 'Lỗi');
        }
      },
      error: (err) => {
        console.error('Lỗi từ http:', err);
        this.toastr.error('Lỗi khi đăng nhập bằng Google', 'Lỗi');
      }
    });
  }

  save() {
    // Giữ nguyên logic đăng nhập email/password
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
                this.cartService.cartCount.next(rs.content.countCart);
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
        this.toastr.error('Email hoặc mật khẩu không chính xác!', 'Lỗi');
      }
    });
  }
}
