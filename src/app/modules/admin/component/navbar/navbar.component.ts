import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pageTitle: string = '';
  pageAlias: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd), // Chỉ lấy sự kiện khi điều hướng kết thúc
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data || {};
        })
      )
      .subscribe(data => {
        this.pageTitle = data['title'] || 'Tổng quan';
        this.pageAlias = data['alias'] || 'dashboard';

      });
  }

  ngOnInit() {
    
  }
  

  
}
