import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { orderStatus, paymentType, statusPayment } from '../../../../../core/constants/common';
import { DatePipe } from '@angular/common';
import { CartService } from '../../../../../core/services/cart.service';

@Component({
  selector: 'app-checkoutsuccess',
  templateUrl: './checkoutsuccess.component.html',
  styleUrls: ['./checkoutsuccess.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  orderCode!: string;
  order: any;
  lstItem: any[] = [];
  addressOrder: any;
  lstStatus = orderStatus;
  lstStatusPayment = statusPayment;
  lstPayment = paymentType;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.orderCode = params.get('code')!;
      this.cartService.clearCart();
      this.getData();
    });
  }
  getData() {
    this.orderService.getOrderById(this.orderCode).subscribe((rs) => {
      this.order = rs.content.data;
      this.lstItem = rs.content.data.items;
      this.addressOrder = rs.content.data.address;
      const statusItem = this.lstStatus.find((item) => item.id == this.order.status);
      const statusPaymentItem = this.lstStatusPayment.find(
        (item) => item.id == this.order.statusPayment
      );
      this.order.displayStatus = statusItem ? statusItem.display : 'Unknown Status';
      this.order.displayStatusPayment = statusPaymentItem
        ? statusPaymentItem.display
        : 'Unknown Status';

      const createdAt = new Date(this.order.createdAt + 'Z');
      this.order.createdDate = this.datePipe.transform(createdAt, 'dd/MM/yyyy, HH:mm:ss', '+0700');

      const paymentItem = this.lstPayment.find((item) => item.value == this.order.typePayment);
      this.order.displayPayment = paymentItem ? paymentItem.display : 'Unknown Payment';
    });
  }
}
