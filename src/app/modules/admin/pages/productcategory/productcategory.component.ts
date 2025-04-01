import { Component, OnInit } from '@angular/core';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';
import { Category, ChildCategory, ChildCategory2 } from '../../../../core/models/productcategory.model';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {
  pageTitle: string = 'Danh mục Sản phẩm';
  categories: Category[] = [];
  ListCategory: Category[] = [];
  constructor(private categoryService: ProductcategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.content.data; // Đảm bảo response có dữ liệu hợp lệ

      this.categories.forEach((childCate: Category) => {
        if (childCate.childCategories) {
          this.ListCategory.push(childCate);
          childCate.childCategories.forEach((childCate1: ChildCategory) => {
            if (childCate1.childCategories) {
              this.ListCategory.push(childCate1);
              childCate1.childCategories.forEach((element: ChildCategory2) => {
                this.ListCategory.push(element);
              });
            }
          });
        }
      });
    })
    console.log(this.ListCategory);
  }
  deleteCategory(cateId: string){
    
  }
}
