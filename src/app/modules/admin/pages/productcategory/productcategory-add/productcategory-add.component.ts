import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductcategoryService } from '../../../../../core/services/productcategory.service';
import { CategoryName } from '../../../../../core/models/productcategory.model';
import { AccountService } from '../../../../../core/services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-productcategory-add',
  templateUrl: './productcategory-add.component.html',
  styleUrls: ['./productcategory-add.component.css']
})
export class ProductcategoryAddComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryName: CategoryName[] = []; 
  userId: string | null;
  selectedFile: File | null = null;
  
  
  constructor(private fb: FormBuilder,
    private categoryService: ProductcategoryService,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService) {
      this.userId = this.accountService.getUserId();
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      userId: [this.userId],
      title: ['', Validators.required],
      alias: [''],
      description: [''],
      icon: [null],
      seoTitle: [''],
      seoDescription: [''],
      seoKeywords: [''],
      parentId: [''] 
    });

    this.categoryService.getCategoriesName().subscribe((data) => {
      this.categoryName = data.content.data;
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.categoryForm.valid && this.selectedFile) {
      const formData = new FormData();
  
      formData.append('userId', this.categoryForm.get('userId')?.value);
      formData.append('title', this.categoryForm.get('title')?.value);
      formData.append('alias', this.categoryForm.get('alias')?.value);
      formData.append('description', this.categoryForm.get('description')?.value);
      formData.append('seoTitle', this.categoryForm.get('seoTitle')?.value);
      formData.append('seoDescription', this.categoryForm.get('seoDescription')?.value);
      formData.append('seoKeywords', this.categoryForm.get('seoKeywords')?.value);
      const parentId = this.categoryForm.get('parentId')?.value;
      formData.append('parentId', parentId ? parentId : ''); // hoặc 'null'
      formData.append('image', this.selectedFile); // ảnh kiểu IFormFile
  
      this.categoryService.createCategory(formData).subscribe({
        next: () => {
          this.toastr.success("Thêm danh mục thành công!","Thành công");
          this.router.navigate(['/admin/productcategory']);
        },
        error: (error) => {
          console.error('Lỗi:', error);
        }
      });
    } else {
      this.toastr.error("Form không hợp lệ hoặc chưa chọn ảnh!","Lỗi");
    }
  }
  
}
