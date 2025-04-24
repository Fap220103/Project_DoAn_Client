import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-productsales',
  templateUrl: './productsales.component.html',
  styleUrls: ['./productsales.component.scss']
})
export class ProductSalesComponent implements OnInit, AfterViewInit {
  currentSlide = 0;
  visibleItems = 4; // hiển thị 4 sản phẩm
  slideWidth = 100 / this.visibleItems; // mỗi lần trượt là 25%
  lstProduct: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getLstProduct();
  }
  ngAfterViewInit(): void {}
  getLstProduct() {
    this.productService.get({}, 1, 8, { salePercent: 'desc' }).subscribe((rs) => {
      this.lstProduct = rs.content.data.items;
      console.log(this.lstProduct);
    });
  }
  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
  nextSlide() {
    if (this.currentSlide < this.lstProduct.length - this.visibleItems) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}
