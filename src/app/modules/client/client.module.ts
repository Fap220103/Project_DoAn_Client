import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ClientComponent } from './client.component';
import { PartialSubComponent } from './component/partialsub/partialsub.component';
import { MenuProductCategoryComponent } from './component/menuproductcategory/menuproductcategory.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuArraivalComponent } from './component/menuarraival/menuarraival.component';
import { ProductSalesComponent } from './component/productsales/productsales.component';
import { PartialNewsComponent } from './component/partialnews/partialnews.component';
import { DealOfTheWeekComponent } from './component/dealoftheweek/dealoftheweek.component';
import { BenefitComponent } from './component/benefit/benefit.component';
import { MenuLeftComponent } from './component/menuleft/menuleft.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailComponent } from './pages/product/productdetail/productdetail.component';
import { CartComponent } from './pages/cart/cart.component';
import { PartialCheckoutComponent } from './component/partialcheckout/partialcheckout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PartialPayComponent } from './component/partialpay/partialpay.component';
import { CheckoutSuccessComponent } from './pages/checkout/checkoutsuccess/checkoutsuccess.component';
import { PartialReviewComponent } from './component/partialreview/partialreview.component';
import { ChangePassComponent } from './component/changepass/changepass.component';
import { ChangeProfileComponent } from './component/changeprofile/changeprofile.component';
import { MyOrderComponent } from './component/myorder/myorder.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShippingAddressComponent } from './component/shippingaddress/shippingaddress.component';
import { ForgotPassComponent } from './pages/profile/forgotpass/forgotpass.component';
import { ResetPassComponent } from './pages/profile/resetpass/resetpass.component';
import { AddAddressComponent } from './component/shippingaddress/addaddress/addaddress.component';
import { ChangeAddressComponent } from './pages/checkout/changeaddress/changeaddress.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { ChooseDiscountComponent } from './pages/checkout/chooseDiscount/chooseDiscount.component';
import { ProductReviewComponent } from './pages/product/productreview/productreview.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ClientComponent,
    PartialSubComponent,
    MenuProductCategoryComponent,
    MenuArraivalComponent,
    HomeComponent,
    ProductSalesComponent,
    PartialNewsComponent,
    DealOfTheWeekComponent,
    BenefitComponent,
    ProductComponent,
    MenuLeftComponent,
    ProductDetailComponent,
    CartComponent,
    PartialCheckoutComponent,
    CheckoutComponent,
    PartialPayComponent,
    CheckoutSuccessComponent,
    PartialReviewComponent,
    ProfileComponent,
    ChangePassComponent,
    ChangeProfileComponent,
    MyOrderComponent,
    ShippingAddressComponent,
    ForgotPassComponent,
    ResetPassComponent,
    AddAddressComponent,
    ChangeAddressComponent,
    DiscountComponent,
    ChooseDiscountComponent,
    ProductReviewComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: []
})
export class ClientModule {}
