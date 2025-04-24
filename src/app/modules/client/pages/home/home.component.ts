import { Component, OnInit } from '@angular/core';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lstCategory1: any[] = [];
  constructor(private productCategoryService: ProductcategoryService) {}

  ngOnInit() {
    this.getLstCategory1();
  }
  getLstCategory1() {
    this.productCategoryService.get({ level: 1 }, 1, 4).subscribe((rs) => {
      this.lstCategory1 = rs.content.data.items;
    });
  }
}
