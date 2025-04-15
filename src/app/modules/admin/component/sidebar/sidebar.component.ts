import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../../../core/models/navigation.model';
import { Observable, take } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { AccountService } from '../../../../core/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mainNavigations: NavigationItem[] = [];
  currentUser$!: Observable<User | null>;
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.mainNavigations = user.content.mainNavigations;
      }
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
    this.accountService.logout();
    this.router.navigate(['/auth/login-admin']);
  }
}
