import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../core/services/news.service';

@Component({
  selector: 'app-partialnews',
  templateUrl: './partialnews.component.html',
  styleUrls: ['./partialnews.component.scss']
})
export class PartialNewsComponent implements OnInit {
  lstNews: any[] = [];
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getLstNews();
  }
  getLstNews() {
    this.newsService.get({ type: 'news' }).subscribe((rs) => {
      this.lstNews = rs.content.data;
    });
  }
}
