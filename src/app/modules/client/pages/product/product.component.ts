import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../../core/services/product.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';
import { ColorService } from '../../../../core/services/color.service';
import { SizeService } from '../../../../core/services/size.service';

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
  pageSizeOptions = [5, 10, 20, 100];
  currentUserId!: string;
  lstCategory1: any[] = [];
  lstCategory2: any[] = [];
  lstCategory3: any[] = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  colors = ['Trắng', 'Hồng', 'Đen', 'Đỏ', 'Cam'];
  lstSize: any[] = [];
  lstColor: any[] = [];
  selectedSizes: string[] = [];
  selectedColors: string[] = [];

  categoryId: any;
  price_min!: number;
  price_max!: number;

  activeSort: string = '';
  orderBy: string = '';
  priceSort: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductcategoryService,
    private authService: AuthService,
    private colorService: ColorService,
    private sizeService: SizeService,
    public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.currentUserId = authService.getUserId();
  }

  onFilterByPrice() {
    this.buildParams();
    this.getData();
  }
  async ngOnInit(): Promise<void> {
    await this.loadAllCategories();
    this.activatedRoute.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      const keyword = params['keyword'];
      if (!keyword) {
        if (!categoryId) {
          this.loadProductsByCategoryIds([]);
        }
        this.loadCategoriesAndProducts(categoryId);
      } else {
        this.params = {
          search: keyword
        };
        this.getData();
      }
    });
  }
  // get sản phẩm
  getData(orderby?: any) {
    this.productService
      .getProductByCategory(this.params, this.pageIndex + 1, this.pageSize, orderby)
      .subscribe((rs) => {
        this.lstProduct = rs.content.data.items;
        this.totalCount = rs.content.data.totalRecords;
      });
  }
  onSort() {
    // Cập nhật activeSort khi có thay đổi trong orderBy
    this.activeSort = this.orderBy;

    let orderby: any = null;

    if (this.orderBy === 'newest') {
      orderby = null;
    } else if (this.orderBy === 'bestseller') {
      orderby = { sortBy: 'bestseller' };
    } else if (this.orderBy === 'price|asc') {
      orderby = { sortBy: 'price', order: 'asc' };
    } else if (this.orderBy === 'price|desc') {
      orderby = { sortBy: 'price', order: 'desc' };
    }

    // Gọi các hàm để xây dựng tham số và lấy dữ liệu
    this.buildParams();
    this.getData(orderby);
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
    this.categoryId = ids.join(',');
    this.params = {
      categoryId: this.categoryId
    };
    this.getData();
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

  buildParams() {
    this.params = {
      search: this.searchString,
      colors: this.selectedColors,
      sizes: this.selectedSizes,
      priceMin: this.price_min,
      priceMax: this.price_max,
      categoryId: this.categoryId
    };
  }

  getProductImage(item: any): string {
    return item.imageDefault || 'assets/Content/img/SanPham/h0.png';
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
  goToDetail(id: number) {
    this.router.navigate(['/product', id]);
  }
  toggleSize(size: string) {
    const index = this.selectedSizes.indexOf(size);
    if (index > -1) this.selectedSizes.splice(index, 1);
    else this.selectedSizes.push(size);
    this.params.sizes = this.selectedSizes.join(','); // convert thành chuỗi
    this.buildParams();
    this.getData();
  }
  toggleColor(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) this.selectedColors.splice(index, 1);
    else this.selectedColors.push(color);
    this.params.colors = this.selectedColors.join(','); // convert thành chuỗi
    this.buildParams();
    this.getData();
  }
  getSelectValue(event: Event): string {
    const target = event.target as HTMLSelectElement;
    return target.value;
  }
  changeSort(value: string | Event): void {
    let selectedValue: string;

    if (typeof value === 'string') {
      selectedValue = value;
    } else {
      const selectElement = value.target as HTMLSelectElement;
      selectedValue = selectElement.value;
    }

    this.orderBy = selectedValue;
    this.activeSort = selectedValue;

    // Cập nhật priceSort chỉ nếu là các tùy chọn giá
    if (selectedValue === 'price|asc' || selectedValue === 'price|desc' || selectedValue === '') {
      this.priceSort = selectedValue;
    } else {
      this.priceSort = '';
    }

    this.onSort();
  }
}
