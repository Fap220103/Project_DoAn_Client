import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';

@Component({
  selector: 'app-menuproductcategory',
  templateUrl: './menuproductcategory.component.html',
  styleUrls: ['./menuproductcategory.component.scss']
})
export class MenuProductCategoryComponent implements OnInit {
  @Input() lstCategory1: any;
  constructor() {}

  ngOnInit(): void {
    console.log('menu product categoy', this.lstCategory1);
  }
}
