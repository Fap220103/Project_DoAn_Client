import { Component, OnInit } from '@angular/core';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';
import { Category, ChildCategory, ChildCategory2 } from '../../../../core/models/productcategory.model';
import { AccountService } from '../../../../core/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {
  pageTitle: string = 'Danh mục Sản phẩm';
  categories: Category[] = [];
  ListCategory: Category[] = [];
  userId: string | null;
  constructor(private categoryService: ProductcategoryService,
              private accountService: AccountService,
              private toastr: ToastrService) {
    this.userId = this.accountService.getUserId();
   }

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
  }
  deleteCategory(cateId: string) {
    // const userId = localStorage.getItem('userId'); // hoặc lấy từ AuthService nếu có
  
    // if (!userId) {
    //   alert('Không tìm thấy userId!');
    //   return;
    // }

    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      this.categoryService.deleteCategory(this.userId, cateId).subscribe({
        next: () => {
          this.toastr.success("Xóa danh mục thành công!","Thành công");
          this.ListCategory = this.ListCategory.filter(c => c.id !== cateId);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Đã xảy ra lỗi khi xóa danh mục!","Lỗi");
        }
      });
    }
  }
  
}
