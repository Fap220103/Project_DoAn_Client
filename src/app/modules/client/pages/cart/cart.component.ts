import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';
import { Cart } from '../../../../core/models/cart.model';
import { Observable } from 'rxjs';

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
    const cart$ = this.cartService.getCart();

    if (cart$ instanceof Observable) {
      cart$.subscribe((items) => {
        this.cartItems = items;
        this.calculateTotalAmount();
      });
    } else {
      this.cartItems = cart$;
      this.calculateTotalAmount();
    }
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

    item.quantity = value;
    item.totalPrice = item.quantity * item.price;
    this.calculateTotalAmount();
    setTimeout(() => {
      this.cartService.saveCart(this.cartItems);
    });
  }

  deleteProduct(productVariantId: string) {
    this.cartService.removeFromCart(productVariantId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.productVariantId !== productVariantId);
      this.calculateTotalAmount();
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
