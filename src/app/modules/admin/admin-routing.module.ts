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
import { adminGuard } from '../../core/guards/admin.guard';
import { UserProfileComponent } from './pages/userprofile/userprofile.component';
import { ProductVariantComponent } from './pages/productvariant/productvariant.component';
import { InventoryComponent } from './pages/inventory/inventory.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard.Title' }
      },
      {
        path: 'product',
        component: ProductComponent,
        data: { title: 'Product.Title' }
      },
      {
        path: 'productcategory',
        component: ProductcategoryComponent,
        data: { title: 'Category.Title' }
      },
      {
        path: 'color',
        component: ColorComponent,
        data: { title: 'Color.Title' }
      },
      {
        path: 'size',
        component: SizeComponent,
        data: { title: 'Size.Title' }
      },
      {
        path: 'setting',
        component: SettingComponent,
        canActivate: [adminGuard],
        data: { title: 'Setting.Title' }
      },
      {
        path: 'userprofile',
        component: UserProfileComponent,
        canActivate: [adminGuard],
        data: { title: 'User.Title' }
      },
      {
        path: 'productvariant',
        component: ProductVariantComponent,
        canActivate: [adminGuard],
        data: { title: 'ProductVariant.Title' }
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [adminGuard],
        data: { title: 'Inventory.Title' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
