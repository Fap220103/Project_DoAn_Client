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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  isLoggedIn: any;
  cart!: Cart;
  userId!: string;
  addressDefault: any;
  paymentMethod = '1';

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
    const addItem = {
      CustomerId: this.authService.getUserId(),
      TypePayment: this.paymentMethod,
      ShippingAddressId: this.addressDefault.id,
      Items: this.cartItems
    };
    this.orderService.post(addItem).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.cartService.clearCart();
          this.router.navigate(['/checkoutsuccess']);
          this.processResponse(res);
        } else {
          this.processResponse(false);
        }
      },
      error: () => this.processResponse(false)
    });
  }
  updateAddress() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      position: {
        right: '0'
      },
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
}
