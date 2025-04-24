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
import { ActivatedRoute, Router } from '@angular/router';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';

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
  lstCategory1: any[] = [];
  lstCategory2: any[] = [];
  lstCategory3: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductcategoryService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.currentUserId = authService.getUserId();
  }

  async ngOnInit(): Promise<void> {
    await this.loadAllCategories();
    this.activatedRoute.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      if (!categoryId) {
        this.getData();
      }
      this.loadCategoriesAndProducts(categoryId);
    });
  }
  getData() {
    this.productService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstProduct = rs.content.data.items;
      this.totalCount = rs.content.data.totalRecords;
    });
  }
  loadCategoriesAndProducts(categoryId: string) {
    const c1 = this.lstCategory1.find((c) => c.id === categoryId);
    if (c1) {
      const ids = this.getLeafCategoryIdsByCategory1(c1.id);
      return this.loadProductsByCategoryIds(ids);
    }

    const c2 = this.lstCategory2.find((c) => c.id === categoryId);
    if (c2) {
      const ids = this.getLeafCategoryIdsByCategory2(c2.id);
      return this.loadProductsByCategoryIds(ids);
    }

    const c3 = this.lstCategory3.find((c) => c.id === categoryId);
    if (c3) {
      return this.loadProductsByCategoryIds([c3.id]);
    }
  }
  getLeafCategoryIdsByCategory1(category1Id: string): string[] {
    const category2List = this.lstCategory2.filter((c2) => c2.parentId === category1Id);

    let leafCategoryIds: string[] = [];

    for (const c2 of category2List) {
      const category3List = this.lstCategory3.filter((c3) => c3.parentId === c2.id);

      if (category3List.length > 0) {
        leafCategoryIds.push(...category3List.map((c3) => c3.id));
      } else {
        leafCategoryIds.push(c2.id);
      }
    }

    return leafCategoryIds;
  }
  getLeafCategoryIdsByCategory2(category2Id: string): string[] {
    const category3List = this.lstCategory3.filter((c3) => c3.parentId === category2Id);

    if (category3List.length > 0) {
      return category3List.map((c3) => c3.id);
    } else {
      return [category2Id]; // cấp 2 là cấp cuối
    }
  }
  loadProductsByCategoryIds(ids: string[]) {
    this.productService
      .getProductByCategory(ids, this.pageIndex + 1, this.pageSize)
      .subscribe((rs) => {
        this.lstProduct = rs.content.data.items;
        this.totalCount = rs.content.data.totalRecords;
      });
  }

  // load danh muc lv 1 2 3
  async loadAllCategories() {
    const p1 = this.productCategoryService.get({ level: 1 }, 1, 100).toPromise();
    const p2 = this.productCategoryService.get({ level: 2 }, 1, 100).toPromise();
    const p3 = this.productCategoryService.get({ level: 3 }, 1, 100).toPromise();

    const [res1, res2, res3] = await Promise.all([p1, p2, p3]);

    this.lstCategory1 = res1.content.data.items;
    this.lstCategory2 = res2.content.data.items;
    this.lstCategory3 = res3.content.data.items;
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

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
  goToDetail(id: number) {
    this.router.navigate(['/product', id]);
  }
}
