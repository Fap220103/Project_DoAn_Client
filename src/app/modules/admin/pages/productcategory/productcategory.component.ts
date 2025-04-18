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
  pageTitle: string = 'Danh mục Sản phẩm';
  categories: Category[] = [];
  ListCategory: Category[] = [];
  itemSelectedLv1: any = {};
  itemSelectedLv2: any = {};
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  handleSelectedLv1(item: any) {
    this.itemSelectedLv1 = item;

    this.itemSelectedLv2 = null;
  }

  handleSelectedLv2(item: any) {
    this.itemSelectedLv2 = item;
  }
}
