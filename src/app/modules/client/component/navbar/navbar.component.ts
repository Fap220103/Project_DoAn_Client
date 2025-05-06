import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginComponent } from '../../../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../../auth/register/register.component';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';
import { Router } from '@angular/router';
import { SearchInputComponent } from '../searchinput/searchinput.component';
import { CartService } from '../../../../core/services/cart.service';
import { SettingService } from '../../../../core/services/setting.service';
import { GeneralSetting } from '../../../../core/models/setting.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isSearchOpen = false;
  cartItemCount = 0;
  generalSetting: GeneralSetting | null = null;
  previousScrollPosition = 0;
  isHidden = false;
  isLoggedIn: boolean = false;
  lstCategory1: any[] = [];
  lstCategory2: any[] = [];
  lstCategory3: any[] = [];
  currentLang = 'vi';
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    this.isHidden = currentScroll > this.lastScrollTop;
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  private lastScrollTop = 0;
  constructor(
    private authService: AuthService,
    private productCategoryService: ProductcategoryService,
    private cartService: CartService,
    private settingService: SettingService,
    public dialog: MatDialog,
    public router: Router,
    public translate: TranslateService
    
  ) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.cartService.cartCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi');

    const browserLang = translate.getBrowserLang() ?? 'vi';
    const lang = localStorage.getItem('lang') ?? browserLang;
    translate.use(/en|vi/.test(lang) ? lang : 'vi');
  }

  ngOnInit() {
    this.getLstCategory1();
    this.getLstCategory2();
    this.getLstCategory3();
    this.getGeneralSetting();
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }
  getGeneralSetting() {
    this.settingService.getGeneralSetting().subscribe((data) => {
      this.generalSetting = data;
    });
  }
  getLstCategory1() {
    this.productCategoryService.get({ level: 1 }, 1, 4).subscribe((rs) => {
      this.lstCategory1 = rs.content.data.items;
    });
  }
  getLstCategory2() {
    this.productCategoryService.get({ level: 2 }, 1, 20).subscribe((rs) => {
      this.lstCategory2 = rs.content.data.items;
    });
  }
  getLstCategory3() {
    this.productCategoryService.get({ level: 3 }, 1, 20).subscribe((rs) => {
      this.lstCategory3 = rs.content.data.items;
    });
  }
  getCategory2ByParent(parentId: number) {
    return this.lstCategory2.filter((c) => c.parentId === parentId);
  }

  getCategory3ByParent(parentId: number) {
    return this.lstCategory3.filter((c) => c.parentId === parentId);
  }

  logout() {
    this.cartService.cartCount.next(0);
    this.authService.logout('client');
  }

  onCategoryClick(categoryId: number) {
    this.router.navigate(['/product'], {
      queryParams: { categoryId }
    });
  }

  openSearchDialog(): void {
    this.dialog.open(SearchInputComponent, {
      hasBackdrop: true,
      backdropClass: 'blur-backdrop', // đổi tên để dễ hiểu
      panelClass: 'custom-search-panel'
    });
  }
}
