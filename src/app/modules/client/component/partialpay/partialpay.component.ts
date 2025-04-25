import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-partialpay',
  templateUrl: './partialpay.component.html',
  styleUrls: ['./partialpay.component.scss']
})
export class PartialPayComponent implements OnInit {
  @Input() cartItems: any[] = [];
  @Input() totalAmount: number = 0;

  ngOnInit() {}

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.updateTotal();
  }

  increaseQty(index: number) {
    this.cartItems[index].quantity++;
    this.updateTotal();
  }

  decreaseQty(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateTotal();
    }
  }

  updateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);
  }
  delete(item: any) {}
}
