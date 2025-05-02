import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientComponent } from './client.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailComponent } from './pages/product/productdetail/productdetail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutSuccessComponent } from './pages/checkout/checkoutsuccess/checkoutsuccess.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotPassComponent } from './pages/profile/forgotpass/forgotpass.component';
import { ResetPassComponent } from './pages/profile/resetpass/resetpass.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { PaymentSuccessComponent } from './pages/checkout/payment-success/payment-success.component';
import { PaymentFailureComponent } from './pages/checkout/payment-failure/payment-failure.component';
import { NewsComponent } from './pages/news/news.component';
import { PostComponent } from './pages/news/post/post.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'profile',
        component: ProfileComponent
      },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'checkoutsuccess', component: CheckoutSuccessComponent },
      { path: 'payment-success', component: PaymentSuccessComponent },
      { path: 'payment-failure', component: PaymentFailureComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotpass', component: ForgotPassComponent },
      { path: 'resetpass', component: ResetPassComponent },
      { path: 'discount', component: DiscountComponent },
      { path: 'post', component: PostComponent },
      { path: 'news/:id', component: NewsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
