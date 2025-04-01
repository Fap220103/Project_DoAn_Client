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



@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ProductcategoryComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule
  ],
  exports: []
})
export class AdminModule { }
