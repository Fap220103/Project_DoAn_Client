// cart.service.ts
import { Injectable, Injector } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Observable, map } from 'rxjs';
import { Constants } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService<any> {
  isLoggedIn: boolean = false;
  userId!: string;
  constructor(
    http: HttpClient,
    injector: Injector,
    private authService: AuthService
  ) {
    super(http, Constants.Cart.Resource, injector);
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  private readonly CART_KEY = 'local_cart';

  getCart(): any {
    if (this.isLoggedIn) {
      this.userId = this.authService.getUserId();
      const headers: HttpHeaders = new HttpHeaders();
      return this.http
        .get<any>(`${this.svUrl}/GetCart?userId=${this.userId}`, {
          headers,
          withCredentials: true
        })
        .pipe(map((res) => res.content.data.items));
    } else {
      const cart = localStorage.getItem(this.CART_KEY);
      return cart ? JSON.parse(cart) : [];
    }
  }

  saveCart(cart: CartItem[]) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  addToCart(item: CartItem, quantity: number = 1) {
    const cart = this.getCart();
    const existing = cart.find((x: any) => x.productVariantId === item.productVariantId);
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
    const cart = this.getCart().filter((x: any) => x.productVariantId !== productVariantId);
    this.saveCart(cart);
  }

  updateQuantity(productVariantId: string, quantity: number) {
    const cart = this.getCart();
    const item = cart.find((x: any) => x.productVariantId === productVariantId);
    if (item) {
      item.quantity = quantity;
      item.totalPrice = quantity * item.price;
      this.saveCart(cart);
    }
  }

  clearCart() {
    localStorage.removeItem(this.CART_KEY);
  }

  syncCartWithServer(model: any): Observable<any> {
    const url = `${this.svUrl}/SyncCart`;
    return this.post(model, url);
  }
}
