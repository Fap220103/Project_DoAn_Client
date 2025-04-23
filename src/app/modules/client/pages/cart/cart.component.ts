import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  constructor(private cartService: CartService) {}
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

  updateQuantity(item: any) {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    if (item.quantity > 100) {
      item.quantity = 100;
    }
    item.totalPrice = item.quantity * item.price;
    this.calculateTotalAmount();
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

  deleteProduct(productId: string) {
    this.cartItems = this.cartItems.filter((item) => item.productId !== productId);
    this.calculateTotalAmount();
    this.cartService.removeFromCart(productId);
  }

  updateProduct(productId: number) {
    console.log(`Sản phẩm ${productId} đã được cập nhật`);
  }

  deleteAll() {
    this.cartItems = [];
    this.calculateTotalAmount();
    this.cartService.saveCart(this.cartItems);
  }
}
