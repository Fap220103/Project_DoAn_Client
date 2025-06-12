import { discountType } from './../../../../core/constants/common';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../../core/models/cart.model';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShippingAddressService } from '../../../../core/services/shippingaddress.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeAddressComponent } from './changeaddress/changeaddress.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../../core/services/order.service';
import { AddAddressComponent } from '../../component/shippingaddress/addaddress/addaddress.component';
import { ChooseDiscountComponent } from './chooseDiscount/chooseDiscount.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  totalAmountDiscount: number = 0;
  isLoggedIn: any;
  cart!: Cart;
  userId!: string;
  addressDefault: any;
  paymentMethod = '1';
  discount: any;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private addressService: ShippingAddressService,
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadCartItems();
    this.getAddress();
  }

  loadCartItems() {
    const cart$ = this.cartService.getCart();

    if (cart$ instanceof Observable) {
      cart$.subscribe((items) => {
        this.cartItems = items;
        this.calculateTotalAmount();
      });
    } else {
      this.cartItems = cart$;
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  getAddress() {
    this.addressService.getAddressDefault(this.authService.getUserId()).subscribe((rs) => {
      this.addressDefault = rs.content.data;
    });
  }
  changeAddress(addressDefault: any) {
    const dialogRef = this.dialog.open(ChangeAddressComponent, {
      data: {
        currentAddress: addressDefault
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addressDefault = result;
      }
    });
  }
  processResponse(res: any, msg?: string) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.DeleteSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.DeleteFail');

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
  submit() {
    if (!this.addressDefault || !this.addressDefault.id) {
      this.snackBar.open('Vui lòng chọn địa chỉ giao hàng trước khi đặt hàng.', 'OK', {
        verticalPosition: 'bottom',
        duration: 3000
      });
      return;
    }

    const addItem = {
      CustomerId: this.authService.getUserId(),
      TypePayment: this.paymentMethod,
      ShippingAddressId: this.addressDefault.id,
      Items: this.cartItems,
      discountId: this.discount?.discountId || '',
      discountType: this.discount?.discountType || 0,
      discountValue: this.discount?.discountValue || 0
    };
    console.log('add order: ', addItem);
    this.orderService.post(addItem).subscribe({
      next: (res) => {
        if (res.code === 200) {
          const paymentUrl = res.content?.paymentUrl;

          if (paymentUrl) {
            // Nếu là thanh toán qua VNPAY → chuyển hướng
            window.location.href = paymentUrl;
          } else {
            // Thanh toán COD hoặc thành công nội bộ
            this.cartService.clearCart();
            this.router.navigate(['/checkoutsuccess', res.content.id]);
            this.processResponse(res, 'Đặt hàng thành công');
          }
        } else {
          this.processResponse(false, 'Đặt hàng thất bại');
          this.router.navigate(['/payment-failure']);
        }
      },
      error: () => {
        this.processResponse(false, 'Đặt hàng thất bại');
        this.router.navigate(['/payment-failure']);
      }
    });
  }
  updateAddress() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      data: {
        title: 'ShippingAddress.AddTitle',
        isEdit: false,
        userId: this.authService.getUserId()
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAddress();
      }
    });
  }
  chooseDiscount() {
    const dialogRef = this.dialog.open(ChooseDiscountComponent, {
      data: {
        title: 'ShippingAddress.AddTitle',
        totalAmount: this.totalAmount,
        userId: this.authService.getUserId()
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.discount = result;
        this.calculateTotalAmountDiscount();
        console.log('discount: ', this.discount);
      } else {
        this.discount = null;
        this.totalAmountDiscount = 0;
      }
    });
  }
  calculateTotalAmountDiscount() {
    if (this.discount.discountType == 0) {
      this.totalAmountDiscount =
        this.totalAmount - (this.totalAmount * this.discount.discountValue) / 100;
    } else {
      this.totalAmountDiscount = this.totalAmount - this.discount.discountValue;
    }
  }
}
