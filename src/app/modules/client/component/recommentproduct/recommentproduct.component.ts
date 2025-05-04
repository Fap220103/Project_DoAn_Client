import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommentproduct',
  templateUrl: './recommentproduct.component.html',
  styleUrls: ['./recommentproduct.component.scss']
})
export class RecommentProductComponent implements OnInit, OnChanges {
  @Input() productId!: string;
  currentIndex = 0;
  slideWidth = 300; // Adjust based on your product card width
  currentSlide = 0;

  lstProduct: any[] = [];
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLstProduct();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && !changes['productId'].firstChange) {
      this.getLstProduct();
    }
  }
  getLstProduct() {
    this.productService.getRsProduct(this.productId).subscribe((rs) => {
      this.lstProduct = rs.content.data;
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
  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
