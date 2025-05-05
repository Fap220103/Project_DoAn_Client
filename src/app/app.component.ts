import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi');

    const browserLang = translate.getBrowserLang() ?? 'vi';
    const lang = localStorage.getItem('lang') ?? browserLang;
    translate.use(/en|vi/.test(lang) ? lang : 'vi');
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.urlAfterRedirects.startsWith('/admin')) {
          this.loadTawkScript();
        }
      }
    });
  }
  loadTawkScript(): void {
    if (document.getElementById('tawk-script')) return;

    const s1 = document.createElement('script');
    s1.id = 'tawk-script';
    s1.src = 'https://embed.tawk.to/68147f55208f2c19170845f2/1iq812q8g';
    s1.async = true;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);
  }
}
