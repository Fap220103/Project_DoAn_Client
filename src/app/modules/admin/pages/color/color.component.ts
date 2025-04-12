import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../../core/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../../../core/services/color.service';
import { MatDialog } from '@angular/material/dialog';
import { ColorAddComponent } from './color-add/color-add.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  pageTitle: string = 'Màu sắc';
  lstColor: any[] = [];
  userId: string | null;
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};

  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private colorService: ColorService,
              public dialog: MatDialog,) {
              this.userId = this.accountService.getUserId();
             
  }
  
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.colorService.get(this.params,this.pageIndex + 1,this.pageSize).subscribe(
      rs =>{
        this.lstColor = rs.content.data.items;
        this.lstColor = this.lstColor.map((x,index) =>{
          x.position = this.pageIndex * this.pageSize + index + 1;
          return x;
        });
        this.totalCount = rs.content.data.totalRecords;
    })
  }
  onChangePage(event: any){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }
  edit(item: any){
    console.log(item);
    this.selectedItem = item;
    const dialogRef = this.dialog.open(ColorAddComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0',
      },
      data: {
        title: 'Color.EditTitle',
        item: this.selectedItem,
        isEdit: true,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
  delete(cateId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      // this.colorService.deleteCategory(this.userId, cateId).subscribe({
      //   next: () => {
      //     this.toastr.success("Xóa danh mục thành công!", "Thành công");
      //     this.ListCategory = this.ListCategory.filter(c => c.id !== cateId);
      //   },
      //   error: (err) => {
      //     console.error(err);
      //     this.toastr.error("Đã xảy ra lỗi khi xóa danh mục!", "Lỗi");
      //   }
      // });
    }
  }
  add(){
    const dialogRef = this.dialog.open(ColorAddComponent, {
      minWidth: '70%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0',
      },
      data: {
        title: 'Color.AddTitle',
        isEdit: false,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
  handleChangeSearchInput(event: any){
    if (event.key === 'Enter') {
      this.params = {
        search: this.searchString,
      };
      this.getData();
    } else {
      this.searchString = (event.target.value ?? '').trim();
    }
  }
  handleClearSearchInput(){
    this.searchString = '';
    this.params = {
      search: this.searchString,
    };
    this.getData();
  }
 
}
