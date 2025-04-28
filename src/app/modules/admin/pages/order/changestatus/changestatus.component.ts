import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { orderStatus } from '../../../../../core/constants/common';

@Component({
  selector: 'app-changestatus',
  templateUrl: './changestatus.component.html',
  styleUrls: ['./changestatus.component.scss']
})
export class ChangeOrderStatusComponent implements OnInit {
  lstStatus = orderStatus;
  selectedStatus: number;

  constructor(
    public dialogRef: MatDialogRef<ChangeOrderStatusComponent>,
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
