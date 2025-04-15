import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi');

    const browserLang = translate.getBrowserLang() ?? 'vi';
    const lang = localStorage.getItem('lang') ?? browserLang;
    translate.use(/en|vi/.test(lang) ? lang : 'vi');
  }
}
