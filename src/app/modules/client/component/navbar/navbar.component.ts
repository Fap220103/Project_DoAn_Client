import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginComponent } from '../../../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../../auth/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {}
  logout() {
    this.authService.logout('client');
  }
  // login() {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     width: '600px', // hoặc tùy chỉnh theo nhu cầu
  //     height: '500px',
  //     disableClose: false, // nếu bạn không muốn người dùng click ngoài để đóng
  //     autoFocus: true,
  //     data: {
  //       title: 'Product.AddTitle',
  //       isEdit: false
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       //this.getData();
  //     }
  //   });
  // }
  // register() {
  //   const dialogRef = this.dialog.open(RegisterComponent, {
  //     minWidth: '70%',
  //     height: '100%',
  //     panelClass: 'custom-dialog-right',
  //     position: {
  //       right: '0'
  //     },
  //     data: {
  //       title: 'Product.AddTitle',
  //       isEdit: false
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       //this.getData();
  //     }
  //   });
  // }
}
