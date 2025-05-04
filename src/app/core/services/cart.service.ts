// cart.service.ts
import { Injectable, Injector } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { BehaviorSubject, Observable, map, mergeMap, of } from 'rxjs';
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
  public cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  constructor(
    http: HttpClient,
    injector: Injector,
    private authService: AuthService
  ) {
    super(http, Constants.Cart.Resource, injector);
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.updateCartCount();
  }
  private readonly CART_KEY = 'local_cart';

  getCart(): Observable<CartItem[]> {
    if (this.isLoggedIn) {
      this.userId = this.authService.getUserId();
      const headers: HttpHeaders = new HttpHeaders();
      return this.http
        .get<any>(`${this.svUrl}/GetCart?userId=${this.userId}`, {
          headers,
          withCredentials: true
        })
        .pipe(
          map((res) => {
            const items = res.content.data.items;
            this.cartCount.next(items.length);
            return items;
          })
        );
    } else {
      const cart = localStorage.getItem(this.CART_KEY);
      const parsedCart = cart ? JSON.parse(cart) : [];
      this.cartCount.next(parsedCart.length);
      return of(parsedCart as CartItem[]);
    }
  }

  private updateCartCount() {
    this.getCart().subscribe((cart) => {
      this.cartCount.next(cart.length);
    });
  }

  saveCart(cart: CartItem[]) {
    if (this.isLoggedIn) {
      const userId = this.authService.getUserId();
      const params = {
        items: cart,
        userId: userId
      };
      this.http.post(`${this.svUrl}/SaveCart`, params, { withCredentials: true }).subscribe(() => {
        this.cartCount.next(cart.length);
      });
    } else {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      this.cartCount.next(cart.length);
    }
  }

  addToCart(item: CartItem, quantity: number = 1): Observable<void> {
    return this.getCart().pipe(
      map((cart) => {
        const existing = cart.find((x) => x.productVariantId === item.productVariantId);
        if (existing) {
          existing.quantity += quantity;
          existing.totalPrice = existing.quantity * existing.price;
        } else {
          item.quantity = quantity;
          item.totalPrice = item.price * quantity;
          cart.push(item);
        }
        //this.saveCart(cart);
        this.cartCount.next(cart.length);
        if (this.isLoggedIn) {
          return this.addToCartApi(item, quantity);
        } else {
          localStorage.setItem(this.CART_KEY, JSON.stringify(cart));

          return of(undefined);
        }
      }),
      mergeMap((result) => result)
    );
  }

  removeFromCart(productVariantId: string): Observable<void> {
    if (this.isLoggedIn) {
      // Nếu đã login → Gọi API xóa server
      return this.http.delete<void>(`${this.svUrl}/RemoveCartItem`, {
        params: {
          userId: this.userId,
          productVariantId: productVariantId
        },
        withCredentials: true
      });
    } else {
      // Nếu chưa login → Xóa localStorage
      return this.getCart().pipe(
        map((cart: CartItem[]) => {
          const updatedCart = cart.filter((x) => x.productVariantId !== productVariantId);

          this.saveCart(updatedCart);
          return;
        })
      );
    }
  }

  updateQuantity(productVariantId: string, quantity: number) {
    return this.getCart().pipe(
      map((cart: CartItem[]) => {
        const item = cart.find((x: CartItem) => x.productVariantId === productVariantId);
        if (item) {
          item.quantity = quantity;
          item.totalPrice = quantity * item.price;
          this.saveCart(cart);
        }
        return;
      })
    );
  }

  clearCart() {
    if (this.isLoggedIn) {
      this.http
        .delete(`${this.svUrl}/DeleteCart?userId=${this.authService.getUserId()}`, {
          withCredentials: true
        })
        .subscribe(() => {
          this.cartCount.next(0);
        });
    } else {
      localStorage.removeItem(this.CART_KEY);
      this.cartCount.next(0);
    }
  }

  syncCartWithServer(model: any): Observable<any> {
    const url = `${this.svUrl}/SyncCart`;
    return this.post(model, url);
  }
  addToCartApi(item: CartItem, quantity: number): Observable<void> {
    const params = {
      item: item,
      userId: this.authService.getUserId()
    };

    return this.http.post<void>(`${this.svUrl}/AddItemToCart`, params, { withCredentials: true });
  }
}
