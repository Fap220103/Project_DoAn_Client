import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductcategoryComponent } from './pages/productcategory/productcategory.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ColorComponent } from './pages/color/color.component';
import { ColorAddComponent } from './pages/color/color-add/color-add.component';
import { SizeComponent } from './pages/size/size.component';
import { SizeAddComponent } from './pages/size/size-add/size-add.component';
import { SettingComponent } from './pages/setting/setting.component';
import { AddSettingComponent } from './pages/setting/addSetting/addSetting.component';
import { ProductCategoryLv1Component } from './pages/productcategory/productcategory-lv1/productcategory-lv1.component';
import { AddProductCategoryLv1Component } from './pages/productcategory/productcategory-lv1/addProductCategory-lv1/addProductCategory-lv1.component';
import { ProductCategoryLv2Component } from './pages/productcategory/productcategory-lv2/productcategory-lv2.component';
import { ProductCategoryLv3Component } from './pages/productcategory/productcategory-lv3/productcategory-lv3.component';
import { UserProfileComponent } from './pages/userprofile/userprofile.component';
import { AddUserComponent } from './pages/userprofile/adduser/adduser.component';
import { EditUserComponent } from './pages/userprofile/edituser/edituser.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ProductcategoryComponent,
    ProductCategoryLv1Component,
    AddProductCategoryLv1Component,
    ProductCategoryLv2Component,
    ProductCategoryLv3Component,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminComponent,
    ColorComponent,
    ColorAddComponent,
    SizeComponent,
    SizeAddComponent,
    SettingComponent,
    AddSettingComponent,
    UserProfileComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: []
})
export class AdminModule {}
