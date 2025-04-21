import { Component, OnInit } from '@angular/core';
import {
  Category,
  ChildCategory,
  ChildCategory2
} from '../../../../core/models/productcategory.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.scss']
})
export class ProductcategoryComponent implements OnInit {
  itemSelectedLv1: any = {};
  itemSelectedLv2: any = {};
  notice: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  handleSelectedLv1(item: any) {
    this.itemSelectedLv1 = item;
    this.itemSelectedLv2 = {};
    this.notice = true;
  }

  handleSelectedLv2(item: any) {
    this.itemSelectedLv2 = item;
  }
}
