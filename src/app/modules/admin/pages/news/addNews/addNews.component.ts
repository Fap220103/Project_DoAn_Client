import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../core/services/user.service';
import { RolesObj, RoleType, StatusUser } from '../../../../../core/constants/roles';
import { AuthService } from '../../../../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewsService } from '../../../../../core/services/news.service';

@Component({
  selector: 'app-addNews',
  templateUrl: './addNews.component.html',
  styleUrls: ['./addNews.component.scss']
})
export class AddNewsComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  selectedFile!: File;
  imagePreview!: string;
  userId!: string;
  isEdit: boolean;
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'insertImage',
      'undo',
      'redo'
    ],
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    }
  };
  constructor(
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddNewsComponent>,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.userId = authService.getUserId();
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);

    this.form = this.formBuilder.group({
      title: [this.item.title, Validators.required],
      description: [this.item.description, Validators.required],
      detail: [this.item.detail, Validators.required],
      link: [this.item.link],
      type: [this.item.type, Validators.required]
    });
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
    if (this.isEdit && this.item.image) {
      this.imagePreview = this.item.image;
    }
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value;
    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('description', formValue.description);
    formData.append('type', formValue.type);
    formData.append('link', formValue.link);
    formData.append('detail', formValue.detail);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.newsService.post(formData).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.processResponse(res);
        } else {
          this.processResponse(false);
        }
      },
      error: () => this.processResponse(false)
    });
  }

  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res
      ? msg
        ? msg
        : this.translate.instant('Message.AddSuccess')
      : msg
        ? msg
        : this.translate.instant('Message.AddFail');
    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
