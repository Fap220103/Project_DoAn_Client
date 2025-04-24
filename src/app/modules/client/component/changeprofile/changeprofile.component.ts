import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-changeprofile',
  templateUrl: './changeprofile.component.html',
  styleUrls: ['./changeprofile.component.scss']
})
export class ChangeProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading = false;
  selectedFile!: File;
  previewImageUrl: string | ArrayBuffer | null = null;
  defaultImage = 'assets/img/default-avatar.png'; // Nếu Model.Image == null
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [''],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    // Load dữ liệu profile hiện tại
    this.http.get<any>('/api/account/profile').subscribe((data) => {
      this.profileForm.patchValue(data);
      if (data.image) {
        this.previewImageUrl = data.image;
      }
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

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.profileForm.value).forEach(([key, value]) => {
      //formData.append(key, value);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.isLoading = true;

    this.http.post('/api/account/changeprofile', formData).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.success) {
        } else {
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
