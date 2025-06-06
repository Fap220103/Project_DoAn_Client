import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-productsales',
  templateUrl: './productsales.component.html',
  styleUrls: ['./productsales.component.scss']
})
export class ProductSalesComponent implements OnInit {
  currentIndex = 0;
  slideWidth = 300; // Adjust based on your product card width
  currentSlide = 0;

  lstProduct: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getLstProduct();
  }
  getLstProduct() {
    this.productService.get({}, 1, 8, { salePercent: 'desc' }).subscribe((rs) => {
      this.lstProduct = rs.content.data.items;
      console.log(this.lstProduct);
    });
  }
  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  slideLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSliderPosition();
    }
  }

  slideRight() {
    const visibleItems = Math.floor(
      document.querySelector('.slider-container')!.clientWidth / this.slideWidth
    );
    const maxIndex = this.lstProduct.length - visibleItems;

    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateSliderPosition();
    }
  }

  updateSliderPosition() {
    const sliderContent = document.querySelector('.slider-content') as HTMLElement;
    if (sliderContent) {
      sliderContent.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
    }
  }
}
