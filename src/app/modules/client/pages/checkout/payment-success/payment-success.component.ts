import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../../core/services/cart.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  orderId = '';
  message = '';
  amount = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParamMap.get('orderId') || '';
    this.message = this.route.snapshot.queryParamMap.get('message') || '';
    this.amount = this.route.snapshot.queryParamMap.get('amount') || '';
    if (this.message.toLowerCase().includes('thành công')) {
      this.cartService.clearCart();
    }
  }
}
