import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderitems',
  templateUrl: './orderitems.component.html',
  styleUrls: ['./orderitems.component.scss']
})
export class OrderItemsComponent implements OnInit {
  @Input() productItems: any[] = [];
  constructor() {}

  ngOnInit() {
    this.productItems = this.productItems.map((x, index) => {
      x.totalPrice = x.price * x.quantity;
      return x;
    });
  }
}
