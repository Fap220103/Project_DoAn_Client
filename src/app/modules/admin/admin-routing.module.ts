import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductcategoryComponent } from './pages/productcategory/productcategory.component';
import { AdminComponent } from './admin.component';
import { authGuard } from '../../core/guards/auth.guard';
import { ColorComponent } from './pages/color/color.component';
import { SizeComponent } from './pages/size/size.component';
import { SettingComponent } from './pages/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Tổng quan', alias: 'dashboard' }
      },
      {
        path: 'product',
        component: ProductComponent,
        data: { title: 'Sản phẩm', alias: 'product' }
      },
      {
        path: 'productcategory',
        component: ProductcategoryComponent,
        data: { title: 'Danh mục sản phẩm', alias: 'productcategory' }
      },
      { path: 'color', component: ColorComponent, data: { title: 'Màu sắc', alias: 'color' } },
      { path: 'size', component: SizeComponent, data: { title: 'kích cỡ', alias: 'size' } },
      { path: 'setting', component: SettingComponent, data: { title: 'Cài đặt', alias: 'setting' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
