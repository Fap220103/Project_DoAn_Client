import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../../../core/models/navigation.model';
import { Observable, take } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  mainNavigations: NavigationItem[] = [];
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.mainNavigations = this.authService.getMenu();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.mainNavigations.forEach((item) => {
      item.expanded = false;
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
