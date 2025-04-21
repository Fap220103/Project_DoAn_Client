import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductImageService } from '../../../../../core/services/productimage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
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
          this.processResponse(res, this.translate.instant('ProductImage.Message.AddSuccess'));
          this.loadImages();
        },
        error: () =>
          this.processResponse(false, this.translate.instant('ProductImage.Message.AddFail'))
      });
    }
  }
  deleteImage(id: string) {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.productImageService.deleteImage(id.toString()).subscribe({
          next: (res) => {
            this.processResponse(res, this.translate.instant('ProductImage.Message.DeleteSuccess'));
            this.loadImages();
          },
          error: () =>
            this.processResponse(false, this.translate.instant('ProductImage.Message.DeleteFail'))
        });
      }
    });
  }

  changeDefault(id: string) {
    const idDefault = this.images.find((i) => i.isDefault)?.id || -1;
    Swal.fire({
      title: this.translate.instant('ProductImage.Message.ChangeDefaultConfirm'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('ProductImage.Message.Yes'),
      cancelButtonText: this.translate.instant('ProductImage.Message.No')
    }).then((result) => {
      if (result.isConfirmed) {
        this.productImageService.changeDefault(id.toString(), idDefault.toString()).subscribe({
          next: (res) => {
            this.processResponse(
              res,
              this.translate.instant('ProductImage.Message.ChangeDefaultSuccess')
            );
            this.loadImages();
          },
          error: () =>
            this.processResponse(
              false,
              this.translate.instant('ProductImage.Message.ChangeDefaultFail')
            )
        });
      }
    });
  }
  deleteAllImages() {
    Swal.fire({
      title: this.translate.instant('Common.DeleteConfirm'),
      text: this.translate.instant('Common.DeleteTitle'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Common.Delete'),
      cancelButtonText: this.translate.instant('Common.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteTasks = this.images.map((img) =>
          this.productImageService.deleteImage(img.id.toString())
        );

        Promise.all(deleteTasks.map((obs) => obs.toPromise()))
          .then(() => {
            this.processResponse(
              true,
              this.translate.instant('ProductImage.Message.ChangeDefaultSuccess')
            );
            this.loadImages();
          })
          .catch(() =>
            this.processResponse(
              false,
              this.translate.instant('ProductImage.Message.ChangeDefaultFail')
            )
          );
      }
    });
  }

  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.EditSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.EditFail');
    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
