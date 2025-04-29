import { OrderService } from './../../../../../core/services/order.service';
import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../../../../core/services/review.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productreview',
  templateUrl: './productreview.component.html',
  styleUrls: ['./productreview.component.scss']
})
export class ProductReviewComponent implements OnInit {
  checkStatusUserOrder: boolean = false;
  lstReview: any[] = [];
  filteredReviews: any[] = [];
  selectedRating: number = 0;
  content: string = '';
  @Input() productId!: string;

  searchText: string = '';
  selectedStars: number[] = [];

  totalReviews: number = 0;
  averageRating: number = 0;

  constructor(
    private reviewService: ReviewService,
    private orderService: OrderService,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
    this.checkHasOrdered();
  }

  checkHasOrdered() {
    this.orderService
      .getStatusUserOrder(this.authService.getUserId(), this.productId)
      .subscribe((rs) => {
        this.checkStatusUserOrder = rs.content.data;
      });
  }
  getData() {
    this.reviewService.get({ productId: this.productId }, 1, 100).subscribe((rs) => {
      this.lstReview = rs.content.data.items;
      this.filteredReviews = [...this.lstReview]; // phải gán sau khi load dữ liệu
      this.calculateReviewStats();
      console.log(this.filteredReviews);
    });
  }
  selectRating(star: number) {
    this.selectedRating = star;
  }
  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  filterReviews() {
    this.filteredReviews = this.lstReview.filter(
      (review) =>
        review.content.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.selectedStars.length === 0 || this.selectedStars.includes(review.rate))
    );
  }

  filterByStars(star: number) {
    if (this.selectedStars.includes(star)) {
      this.selectedStars = this.selectedStars.filter((s) => s !== star);
    } else {
      this.selectedStars.push(star);
    }
    this.filterReviews();
  }

  calculateReviewStats() {
    this.totalReviews = this.lstReview.length;
    if (this.totalReviews > 0) {
      const totalRating = this.lstReview.reduce((sum, review) => sum + review.rate, 0);
      this.averageRating = +(totalRating / this.totalReviews).toFixed(1); // làm tròn 1 chữ số sau dấu ,
    } else {
      this.averageRating = 0;
    }
  }
  save() {
    if (this.selectedRating === 0) {
      alert('Bạn phải chọn số sao trước khi gửi đánh giá!');
      return;
    }
    const addReview = {
      productId: this.productId,
      customerId: this.authService.getUserId(),
      content: this.content,
      rate: this.selectedRating
    };
    this.reviewService.post(addReview).subscribe(
      (res) => {
        if (res.code === 200) {
          this.getData();
          this.snackBar.open('Cảm ơn đánh giá của bạn', 'Đóng', { duration: 3000 });
        } else {
          this.snackBar.open('Đánh giá thất bại', 'Đóng', {
            duration: 3000
          });
        }
      },
      (error) => {
        this.snackBar.open('Đánh giá thất bại', 'Đóng', {
          duration: 3000
        });
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
