import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editimageproduct',
  templateUrl: './editimageproduct.component.html',
  styleUrls: ['./editimageproduct.component.scss']
})
export class EditimageproductComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  images: any[] = [];
  productId: number = 1; // hoặc lấy từ route params
  constructor() {}

  ngOnInit() {}
  oadImages() {
    this.http.get(`/api/productimage/list/${this.productId}`).subscribe((res: any) => {
      this.images = res;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('productId', this.productId.toString());
      formData.append('image', file);

      this.http.post('/admin/productimage/addimage', formData).subscribe((rs: any) => {
        if (rs.success) {
          this.images.push({ id: rs.newId, image: rs.imageUrl, isDefault: false });
          //this.notyf.success("Thêm thành công!!");
        } else {
          //this.notyf.error("Thêm thất bại!!");
        }
      });
    }
  }

  deleteImage(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa không?')) {
      this.http.post('/admin/ProductImage/DeleteImage', { id }).subscribe((rs: any) => {
        if (rs.success) {
          this.images = this.images.filter((img) => img.id !== id);
          //this.notyf.success("Xóa thành công!!");
        } else {
          //this.notyf.error("Xóa thất bại!!");
        }
      });
    }
  }

  changeDefault(id: number) {
    const idDefault = this.images.find((i) => i.isDefault)?.id || -1;

    if (confirm('Bạn có chắc chắn muốn thay đổi không?')) {
      this.http
        .post('/admin/ProductImage/ChangeDefault', { id, idDefault })
        .subscribe((rs: any) => {
          if (rs.success) {
            this.images = this.images.map((img) => ({
              ...img,
              isDefault: img.id === id
            }));
            //this.notyf.success("Sửa thành công!!");
          } else {
            //this.notyf.error("Sửa thất bại!!");
          }
        });
    }
  }

  deleteAllImages() {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả không?')) {
      this.images.forEach((img) => this.deleteImage(img.id));
    }
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
