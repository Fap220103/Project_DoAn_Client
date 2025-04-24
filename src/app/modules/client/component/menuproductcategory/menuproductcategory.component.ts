import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';

@Component({
  selector: 'app-menuproductcategory',
  templateUrl: './menuproductcategory.component.html',
  styleUrls: ['./menuproductcategory.component.scss']
})
export class MenuProductCategoryComponent implements OnInit {
  lstCategory: any[] = [];
  constructor(
    private translate: TranslateService,
    private productCategoryService: ProductcategoryService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.productCategoryService.get({ level: 1 }, 1, 4).subscribe((rs) => {
      this.lstCategory = rs.content.data.items;
    });
  }
}
