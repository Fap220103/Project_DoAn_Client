import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductcategoryComponent } from './pages/productcategory/productcategory.component';
import { AdminComponent } from './admin.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent, 
    canActivate: [authGuard],
    children: [
        { path: 'dashboard', component: DashboardComponent, data: { title: 'Tổng quan', alias: 'dashboard' } },
        { path: 'product', component: ProductComponent, data: { title: 'Sản phẩm', alias: 'product' } },
        { path: 'productcategory', component: ProductcategoryComponent, data: { title: 'Danh mục sản phẩm', alias: 'productcategory' } },
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
