import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-changeprofile',
  templateUrl: './changeprofile.component.html',
  styleUrls: ['./changeprofile.component.scss']
})
export class ChangeProfileComponent implements OnInit {
  @Output() updated = new EventEmitter<void>();
  profileForm!: FormGroup;
  profile: any;
  isLoading = false;
  selectedFile!: File;
  previewImageUrl: string | ArrayBuffer | null = null;
  defaultImage = '/assets/Content/img/SanPham/h0.png'; // Nếu Model.Image == null
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [''],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.getData();
  }
  getData() {
    const userId = this.authService.getUserId();
    this.userService.getProfile(userId).subscribe((rs) => {
      this.profile = rs.content.data;

      this.profileForm.patchValue({
        id: this.profile.id,
        userName: this.profile.userName,
        email: this.profile.email,
        phoneNumber: this.profile.phoneNumber
      });

      this.previewImageUrl =
        this.profile.profilePictureName ?? '/assets/Content/img/SanPham/h0.png';
    });
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    formData.append('id', this.profileForm.value.id);
    formData.append('userName', this.profileForm.value.userName);
    formData.append('phoneNumber', this.profileForm.value.phoneNumber);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.userService.changeProfile(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.code === 200) {
          this.getData();
          this.updated.emit();
          this.processResponse(res, 'Cập nhật thành công!');
        } else {
          this.processResponse(false, 'Cập nhật thất bại!');
        }
      },
      error: () => {
        this.processResponse(false, 'Lỗi khi gửi yêu cầu!');
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
