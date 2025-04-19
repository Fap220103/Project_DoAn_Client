import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../../../core/services/color.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AddUserComponent } from './adduser/adduser.component';
import { UserService } from '../../../../core/services/user.service';
import { RoleType, StatusUser } from '../../../../core/constants/roles';
import { EditUserComponent } from './edituser/edituser.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent implements OnInit {
  pageTitle: string = 'Màu sắc';
  lstUser: any[] = [];
  searchString: string = '';
  selectedItem: any = {};
  params: any = {};

  totalCount = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  lstRole = RoleType;
  lstStatus = StatusUser;
  currentUserId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.currentUserId = authService.getUserId();
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.userService.get(this.params, this.pageIndex + 1, this.pageSize).subscribe((rs) => {
      this.lstUser = rs.content.data.items;
      this.lstUser = this.lstUser.map((x, index) => {
        x.position = this.pageIndex * this.pageSize + index + 1;
        x.displayStatus = this.lstStatus.find((item) => item.code === x.status)?.display;
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
    console.log(item);
    this.selectedItem = item;
    const dialogRef = this.dialog.open(EditUserComponent, {
      minWidth: '50%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'User.EditTitle',
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
  delete(userId: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(userId).subscribe({
          next: (res) => {
            if (res.code === 200) {
              this.getData();
              this.toastr.success('Xóa thành công!', 'Thành công');
            } else {
              this.toastr.error('Xóa thất bại!', 'Thất bại');
            }
          },
          error: (err) => {
            this.toastr.error('Đã xảy ra lỗi khi xóa!', 'Lỗi');
          }
        });
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      minWidth: '30%',
      height: '100%',
      panelClass: 'custom-dialog-right',
      position: {
        right: '0'
      },
      data: {
        title: 'User.AddTitle',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  handleChangeSearchInput(event: any) {
    if (event.key === 'Enter') {
      this.params = {
        search: this.searchString
      };
      this.getData();
    } else {
      this.searchString = (event.target.value ?? '').trim();
    }
  }

  handleClearSearchInput() {
    this.searchString = '';
    this.params = {
      search: this.searchString
    };
    this.getData();
  }

  handleChangeRole(event: any) {
    console.log(event);
    this.params = {
      role: event
    };
    this.getData();
  }
}
