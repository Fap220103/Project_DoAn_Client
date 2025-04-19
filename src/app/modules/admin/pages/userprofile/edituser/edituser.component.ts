import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../core/services/user.service';
import { RolesObj, RoleType, StatusUser } from '../../../../../core/constants/roles';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  lstRole = RolesObj;
  item: any = {};
  isEdit: boolean;
  selectedFile!: File;
  lstStatus = StatusUser;
  imagePreview!: string;
  userId!: string;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.userId = authService.getUserId();
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);

    console.log('item: ',this.item);
    this.form = this.formBuilder.group(
      {
        // email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        image: ['', Validators.required],
        status: [this.item.status, Validators.required],
        roles: [[], Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
    this.fetchData();
  }

  fetchData(){
   console.log('fetch data item: ',this.item);
    this.form.patchValue({
      userName: this.item.userName,
      phoneNumber: this.item.phoneNumber,
      status: this.item.status,
      image: this.item.profilePictureName,
      roles: this.item.roles 
    });
    this.imagePreview = this.item.profilePictureName;
  }
  handleChangeStatus(event: any){
    this.item.status = event;
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRoleChange(event: any, role: string) {
    const roles: string[] = this.form.get('roles')?.value || [];
    if (event.checked) {
      if (!roles.includes(role)) {
        roles.push(role);
      }
    } else {
      const index = roles.indexOf(role);
      if (index >= 0) {
        roles.splice(index, 1);
      }
    }
    this.form.get('roles')?.setValue(roles);
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
    const formValue = this.form.value;
    const formData = new FormData();
    formData.append('id', this.item.id);
    formData.append('userName', formValue.userName ?? '');
    formData.append('phoneNumber', formValue.phoneNumber ?? '');
    formData.append('status', formValue.status);
    formValue.roles.forEach((role: string) => {
      formData.append('roles', role);
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    // console.log('form data: ', formData);
    //const formValue = this.form.value;
    // const addItem = {
    //   userName: formValue.userName,
    //   phoneNumber: formValue.phoneNumber,
    //   status: this.item.status,
    //   image:  this.selectedFile,
    //   roles: formValue.roles
    // };
    //  console.log('data update: ', addItem);
    this.userService.put(formData).subscribe({
      next: (res) => this.processResponse(res),
      error: () => this.processResponse(false)
    });
  }

  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res ? (msg ? msg : 'Thêm mới thành công') : 'Thêm mới thất bại';

    this.snackBar.open(transForm, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    if (!isClose && res) this.dialogRef.close(res);
  }
}
