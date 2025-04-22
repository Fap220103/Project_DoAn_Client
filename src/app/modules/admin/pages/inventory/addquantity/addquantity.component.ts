import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addquantity',
  templateUrl: './addquantity.component.html',
  styleUrls: ['./addquantity.component.scss']
})
export class AddQuantityComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddQuantityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close(this.data.quantity);
  }
}
