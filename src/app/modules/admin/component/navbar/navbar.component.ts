import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pageTitle: string = '';
  pageAlias: string = '';
  currentLang = 'vi';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd), // Chỉ lấy sự kiện khi điều hướng kết thúc
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data || {};
        })
      )
      .subscribe((data) => {
        this.pageTitle = data['title'] || 'Tổng quan';
        this.pageAlias = data['alias'] || 'dashboard';
      });

    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi');

    const browserLang = translate.getBrowserLang() ?? 'vi';
    const lang = localStorage.getItem('lang') ?? browserLang;
    translate.use(/en|vi/.test(lang) ? lang : 'vi');
  }

  ngOnInit() {}
  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }
}
