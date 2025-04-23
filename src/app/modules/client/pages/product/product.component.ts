import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../../core/services/product.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  lstProduct: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};

  totalCount = 0;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [5, 10, 25, 100];
  currentUserId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.currentUserId = authService.getUserId();
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.lstProduct);
  }
  getData() {
    this.productService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstProduct = rs.content.data.items;
      this.totalCount = rs.content.data.totalRecords;
      console.log('Dữ liệu lấy được:', this.lstProduct);
    });
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }

  handleChangeSearchInput(event: any) {
    if (event.key === 'Enter') {
      this.params = {
        search: this.searchString
      };
      this.getData();
    } else {
      this.searchString = (event.target.value ?? '').trim();
    }
  }

  handleClearSearchInput() {
    this.searchString = '';
    this.params = {
      search: this.searchString
    };
    this.getData();
  }
  addToCart(id: any) {}
  getProductImage(item: any): string {
    return item.imageDefault || 'assets/Content/img/SanPham/h0.png';
  }
  isWishList(item: any): boolean {
    return false;
  }
  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
