import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuproductcategory',
  templateUrl: './menuproductcategory.component.html',
  styleUrls: ['./menuproductcategory.component.scss']
})
export class MenuProductCategoryComponent implements OnInit {
  @Input() lstCategory1: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onCategoryClick(categoryId: number) {
    this.router.navigate(['/product'], {
      queryParams: { categoryId }
    });
  }
}
