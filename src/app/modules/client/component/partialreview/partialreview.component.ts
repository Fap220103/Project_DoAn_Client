import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../../../core/services/review.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-partialreview',
  templateUrl: './partialreview.component.html',
  styleUrls: ['./partialreview.component.scss']
})
export class PartialReviewComponent implements OnInit {
  lstReview: any[] = [];
  @Input() productId!: string;
  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.reviewService.get({ productId: this.productId }, 1, 10).subscribe((rs) => {
      this.lstReview = rs.content.data.items;
    });
  }
  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
