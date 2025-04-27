import { Component, Input, Inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../../core/services/order.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderId!: string;
  order: any;
  lstItem: any[] = [];
  addressOrder: any;

  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.orderId = data.orderId;
  }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.orderService.getOrderById(this.orderId).subscribe((rs) => {
      this.order = rs.content.data;
      this.lstItem = rs.content.data.items;
      this.addressOrder = rs.content.data.address;
    });
  }
}
