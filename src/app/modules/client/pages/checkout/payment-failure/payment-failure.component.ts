import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.scss']
})
export class PaymentFailureComponent implements OnInit {
  orderId = '';
  message = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.message = this.route.snapshot.queryParamMap.get('message') || '';
  }
}
