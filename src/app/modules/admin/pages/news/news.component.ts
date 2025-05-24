import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { SettingService } from '../../../../core/services/setting.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AddNewsComponent } from './addNews/addNews.component';
import { NewsService } from '../../../../core/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  pageTitle: string = 'Cài đặt';
  lstNews: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};
  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private newsService: NewsService,
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.newsService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstNews = rs.content.data;
      this.lstNews = this.lstNews.map((x, index) => {
        x.position = this.pageIndex * this.pageSize + index + 1;
        return x;
      });
      this.totalCount = rs.content.data.totalRecords;
    });
  }
  onChangePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  edit(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(AddNewsComponent, {
      minWidth: '50%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'News.EditTitle',
        item: this.selectedItem,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(AddNewsComponent, {
      minWidth: '50%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'News.AddTitle',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }
  delete(settingId: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.newsService.delete(settingId).subscribe({
          next: (res) => {
            if (res.code === 200) {
              this.getData();
              this.processResponse(res);
            } else {
              this.processResponse(false);
            }
          },
          error: (err) => {
            this.processResponse(false);
          }
        });
      }
    });
  }
  processResponse(res: any, msg?: string) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.DeleteSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.DeleteFail');

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
}
