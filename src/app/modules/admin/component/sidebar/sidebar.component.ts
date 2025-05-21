import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../../../core/models/navigation.model';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  mainNavigations: NavigationItem[] = [];
  isLoggedIn: boolean = false;
  userInfo: any;
  role: any;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.mainNavigations = this.authService.getMenu();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.mainNavigations.forEach((item) => {
      item.expanded = false;
    });
    this.role = this.authService.getUserRole();
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getProfile(this.authService.getUserId()).subscribe((rs) => {
      this.userInfo = rs.content.data;
    });
  }
  isDropdown(item: NavigationItem): boolean {
    return item.children.length > 1;
  }

  isSingleLink(item: NavigationItem): boolean {
    return (
      (item.children.length === 0 && item.url !== '#') ||
      (item.children.length === 1 && item.children[0].url !== '#')
    );
  }

  getSingleLink(item: NavigationItem): NavigationItem {
    return item.children.length === 1 ? item.children[0] : item;
  }
  logout() {
    this.authService.logout('admin');
  }
  toggleDropdown(item: NavigationItem, event: MouseEvent): void {
    item.expanded = !item.expanded;
  }
}
