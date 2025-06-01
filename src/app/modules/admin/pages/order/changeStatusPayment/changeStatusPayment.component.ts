import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { orderStatus, statusPayment } from '../../../../../core/constants/common';
@Component({
  selector: 'app-changeStatusPayment',
  templateUrl: './changeStatusPayment.component.html',
  styleUrls: ['./changeStatusPayment.component.scss']
})
export class ChangeStatusPaymentComponent implements OnInit {
  lstStatus = statusPayment;
  selectedStatus: number;

  constructor(
    public dialogRef: MatDialogRef<ChangeStatusPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Order status:', this.data.item.status);
    this.selectedStatus = this.data.item.status;
  }
  ngOnInit() {
    if (this.data.item.status) {
      this.selectedStatus = this.data.item.status;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateStatus(): void {
    this.dialogRef.close(this.selectedStatus);
  }
}
