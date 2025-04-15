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
import { ProductcategoryAddComponent } from './pages/productcategory/productcategory-add/productcategory-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ColorComponent } from './pages/color/color.component';
import { ColorAddComponent } from './pages/color/color-add/color-add.component';
import { SizeComponent } from './pages/size/size.component';
import { SizeAddComponent } from './pages/size/size-add/size-add.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ProductcategoryComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProductcategoryAddComponent,
    AdminComponent,
    ColorComponent,
    ColorAddComponent,
    SizeComponent,
    SizeAddComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,

  ],
  exports: []
})
export class AdminModule { }
