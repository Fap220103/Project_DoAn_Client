import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from '../../../../../core/services/inventory.service';

@Component({
  selector: 'app-addinventory',
  templateUrl: './addinventory.component.html',
  styleUrls: ['./addinventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  form!: FormGroup;

  products = [
    { id: '1', name: 'Áo thun', code: 'TS001' },
    { id: '2', name: 'Quần jean', code: 'J002' }
  ];

  sizes = [
    { id: 1, name: 'S' },
    { id: 2, name: 'M' },
    { id: 3, name: 'L' }
  ];

  colors = [
    { id: 1, name: 'Đỏ' },
    { id: 2, name: 'Xanh' },
    { id: 3, name: 'Đen' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddInventoryComponent>,
    private inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.form = this.fb.group({
      productId: [''],
      sizeId: [[]],
      colorId: [[]]
    });
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
  }

  save(): void {
    const formValue = this.form.value;

    const payload = {
      productId: formValue.productId,
      sizeId: formValue.sizeId,
      colorId: formValue.colorId
    };
    console.log('Dữ liệu gửi về backend:', payload);
  }
}
