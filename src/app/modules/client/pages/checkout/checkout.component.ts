import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../../core/models/cart.model';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
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
}
