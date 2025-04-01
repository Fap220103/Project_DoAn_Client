import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../../../core/models/navigation.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mainNavigations: NavigationItem[] = [];
  constructor() { }

  ngOnInit() {
  }
  isDropdown(item: NavigationItem): boolean {
    return item.children.length > 1; // Nếu có nhiều hơn 1 con, hiển thị dropdown
  }
}
