import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../core/services/product.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-searchinput',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  searchString: string = '';
  suggestedProducts: any[] = [];
  private searchSubject: Subject<string> = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<SearchInputComponent>,
    private router: Router,
    public toastr: ToastrService,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500), // đợi 500ms sau khi người dùng ngừng gõ
        distinctUntilChanged() // chỉ tiếp tục nếu chuỗi thay đổi
      )
      .subscribe((searchTerm) => {
        this.fetchSuggestions(searchTerm);
      });
  }

  onSearchInputChange(value: string) {
    this.searchSubject.next(value); // đẩy giá trị vào Subject
  }

  isValidSearchKeyword(keyword: string): boolean {
    // Loại bỏ khoảng trắng đầu cuối, kiểm tra nếu chỉ toàn ký tự đặc biệt
    return /^[a-zA-Z0-9À-ỹ\s]+$/.test(keyword.trim());
  }

  fetchSuggestions(keyword: string) {
    keyword = keyword.trim();

    if (!keyword || !this.isValidSearchKeyword(keyword)) {
      this.suggestedProducts = []; // Xóa gợi ý nếu không hợp lệ
      return;
    }

    // Gọi API thực tế ở đây, ví dụ:
    this.productService.getSuggestions(keyword, 1, 5).subscribe((rs) => {
      this.suggestedProducts = rs.content.data.items;
    });
  }

  searchProduct() {
    if (!this.isValidSearchKeyword(this.searchString)) {
      this.toastr.error('Vui lòng nhập từ khóa hợp lệ', 'Lỗi');
      return;
    }

    this.router.navigate(['/product'], {
      queryParams: { keyword: this.searchString }
    });
    this.dialogRef.close();
  }
  goToDetail(id: string) {
    this.router.navigate(['/product', id]);
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
