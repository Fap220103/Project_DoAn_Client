// cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'local_cart';

  constructor() {}

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  addToCart(item: CartItem, quantity: number = 1) {
    const cart = this.getCart();
    const existing = cart.find((x) => x.productVariantId === item.productVariantId);
    if (existing) {
      existing.quantity += quantity;
      existing.totalPrice = existing.quantity * existing.price;
    } else {
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
      cart.push(item);
    }
    this.saveCart(cart);
  }

  removeFromCart(productVariantId: string) {
    const cart = this.getCart().filter((x) => x.productVariantId !== productVariantId);
    this.saveCart(cart);
  }

  updateQuantity(productVariantId: string, quantity: number) {
    const cart = this.getCart();
    const item = cart.find((x) => x.productVariantId === productVariantId);
    if (item) {
      item.quantity = quantity;
      item.totalPrice = quantity * item.price;
      this.saveCart(cart);
    }
  }

  clearCart() {
    localStorage.removeItem(this.CART_KEY);
  }
}
