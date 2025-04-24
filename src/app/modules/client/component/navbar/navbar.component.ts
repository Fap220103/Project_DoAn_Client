import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginComponent } from '../../../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../../auth/register/register.component';
import { ProductcategoryService } from '../../../../core/services/productcategory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  lstCategory1: any[] = [];
  lstCategory2: any[] = [];
  lstCategory3: any[] = [];
  constructor(
    private authService: AuthService,
    private productCategoryService: ProductcategoryService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {
    this.getLstCategory1();
    this.getLstCategory2();
    this.getLstCategory3();
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
    this.authService.logout('client');
  }

  onCategoryClick(categoryId: number) {
    this.router.navigate(['/product'], {
      queryParams: { categoryId }
    });
  }
}
