import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  pageTitle: string = 'Sản phẩm';
  constructor(private authService: AuthService) {
    // this.authService.currentUser$.pipe(take(1)).subscribe({
    //   next: (user) => {
    //     if (user) {
    //       console.log('Current User in ProductComponent:', user);
    //     } else {
    //       console.log('No user found');
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error subscribing to currentUser$:', err);
    //   }
    // });
  }

  ngOnInit() {}
}
