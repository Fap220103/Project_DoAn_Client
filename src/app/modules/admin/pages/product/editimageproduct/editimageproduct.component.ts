import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductImageService } from '../../../../../core/services/productimage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editimageproduct',
  templateUrl: './editimageproduct.component.html',
  styleUrls: ['./editimageproduct.component.scss']
})
export class EditImageProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  images: any[] = [];
  productId: number = 1;

  constructor(
    public snackBar: MatSnackBar,
    private productImageService: ProductImageService,
    public dialogRef: MatDialogRef<EditImageProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.productId = data.productId;
  }

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.productImageService.getImages(this.productId.toString()).subscribe({
      next: (res) => {
        this.images = res.content.data || [];
      },
      error: (err) => this.processResponse(false, 'Tải ảnh thất bại')
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('productId', this.productId.toString());
      formData.append('image', file);

      this.productImageService.uploadImages(formData).subscribe({
        next: (res) => {
          this.processResponse(res, 'Tải ảnh lên thành công');
          this.loadImages();
        },
        error: () => this.processResponse(false, 'Tải ảnh thất bại')
      });
    }
  }
  deleteImage(id: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productImageService.deleteImage(id.toString()).subscribe({
          next: (res) => {
            this.processResponse(res, 'Xoá ảnh thành công');
            this.loadImages();
          },
          error: () => this.processResponse(false, 'Xoá ảnh thất bại')
        });
      }
    });
  }

  changeDefault(id: string) {
    const idDefault = this.images.find((i) => i.isDefault)?.id || -1;
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thay đổi ảnh đại diện?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productImageService.changeDefault(id.toString(), idDefault.toString()).subscribe({
          next: (res) => {
            this.processResponse(res, 'Đặt ảnh đại diện thành công');
            this.loadImages();
          },
          error: () => this.processResponse(false, 'Thay đổi ảnh đại diện thất bại')
        });
      }
    });
  }
  deleteAllImages() {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteTasks = this.images.map((img) =>
          this.productImageService.deleteImage(img.id.toString())
        );

        Promise.all(deleteTasks.map((obs) => obs.toPromise()))
          .then(() => {
            this.processResponse(true, 'Đã xoá tất cả ảnh');
            this.loadImages();
          })
          .catch(() => this.processResponse(false, 'Lỗi khi xoá tất cả ảnh'));
      }
    });
  }

  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res ? (msg ? msg : 'Cập nhật thành công') : 'Cập nhật thất bại';

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
