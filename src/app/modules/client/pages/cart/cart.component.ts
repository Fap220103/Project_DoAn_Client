import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';
import { Cart } from '../../../../core/models/cart.model';

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
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotalAmount();
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
    // Nếu < 1 thì đặt lại thành 1
    if (value < 1) {
      value = 1;
      input.value = '1';
    }

    item.quantity = value;
    item.totalPrice = item.quantity * item.price;
    this.calculateTotalAmount();
    this.cartService.saveCart(this.cartItems);
  }

  deleteProduct(productVariantId: string) {
    this.cartItems = this.cartItems.filter((item) => item.productVariantId !== productVariantId);
    this.calculateTotalAmount();
    this.cartService.removeFromCart(productVariantId);
  }

  updateProduct(productVariantId: string) {
    console.log(`Sản phẩm ${productVariantId} đã được cập nhật`);
  }

  deleteAll() {
    this.cartItems = [];
    this.calculateTotalAmount();
    this.cartService.saveCart(this.cartItems);
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
