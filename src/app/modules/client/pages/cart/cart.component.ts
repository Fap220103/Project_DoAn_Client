import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';
import { Cart } from '../../../../core/models/cart.model';
import { Observable } from 'rxjs';
import { ProductVariantService } from '../../../../core/services/productvariant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  isLoggedIn: any;
  cart!: Cart;
  userId!: string;
  hasInvalidQuantity: boolean = false;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private variantService: ProductVariantService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const cart$ = this.cartService.getCart();

    if (cart$ instanceof Observable) {
      cart$.subscribe((items) => {
        this.cartItems = items;

        let count = 0;
        this.cartItems.forEach((item, index) => {
          this.variantService.getStock(item.productVariantId).subscribe((res) => {
            const availableStock = res.content.data;
            this.cartItems[index].availableStock = availableStock;

            count++;
            if (count === this.cartItems.length) {
              this.checkInvalidQuantities();
            }

            this.calculateTotalAmount();
          });
        });
      });
    } else {
      this.cartItems = cart$;
      this.calculateTotalAmount();
      this.checkInvalidQuantities();
    }
  }

  checkInvalidQuantities() {
    this.hasInvalidQuantity = this.cartItems.some((item) => item.quantity > item.availableStock);
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  preventInvalidInput(event: KeyboardEvent) {
    const invalidChars = ['-', '+', 'e', 'E'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  onQuantityInput(event: Event, item: any) {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);

    if (value < 1) {
      value = 1;
      input.value = '1';
    }

    this.variantService.getStock(item.productVariantId).subscribe((stockRes) => {
      const availableStock = stockRes.content.data;
      item.availableStock = availableStock;

      if (value > availableStock) {
        this.snackBar.open('Số lượng bạn chọn vượt quá tồn kho', 'Đóng', { duration: 3000 });
      }

      // Dù hợp lệ hay không vẫn gán lại giá trị để cập nhật view
      item.quantity = value;
      item.totalPrice = Math.round(item.quantity * item.price * 100) / 100;

      this.calculateTotalAmount();
      this.cartService.saveCart(this.cartItems);

      // ✅ Kiểm tra lại toàn bộ giỏ hàng
      this.checkInvalidQuantities();
    });
  }

  deleteProduct(productVariantId: string) {
    this.cartService.removeFromCart(productVariantId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.productVariantId !== productVariantId);
      this.calculateTotalAmount();
      this.cartService.saveCart(this.cartItems);
    });
  }

  updateProduct(productVariantId: string) {
    console.log(`Sản phẩm ${productVariantId} đã được cập nhật`);
  }

  deleteAll() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotalAmount();
  }

  goToCheckOut() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    if (this.isLoggedIn) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/checkout' } });
    }
  }
}
