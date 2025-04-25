import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentView: 'profile' | 'password' | 'order' = 'profile';
  userName!: string;
  image!: string;
  constructor(private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getData();
  }
  show(view: 'profile' | 'password' | 'order') {
    this.currentView = view;
  }
  getData() {
    const userId = this.authService.getUserId();
    this.userService.getProfile(userId).subscribe((rs) => {
      this.userName = rs.content.data.userName;
      this.image = rs.content.data.profilePictureName ?? '/assets/Content/img/SanPham/h0.png'; 
    });
  }
}
