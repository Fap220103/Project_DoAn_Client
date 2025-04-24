import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-menuarraival',
  templateUrl: './menuarraival.component.html',
  styleUrls: ['./menuarraival.component.scss']
})
export class MenuArraivalComponent implements OnInit {
  @Input() lstCategory1: any;
  lstProduct: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getLstProduct();
  }
  getLstProduct() {
    this.productService.get({}, 1, 10).subscribe((rs) => {
      this.lstProduct = rs.content.data.items;
    });
  }
  getProductImage(item: any): string {
    return item.imageDefault || 'assets/Content/img/SanPham/h0.png';
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
