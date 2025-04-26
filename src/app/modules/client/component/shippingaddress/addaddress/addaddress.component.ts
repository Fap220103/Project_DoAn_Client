import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from '../../../../../core/services/setting.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../core/services/auth.service';
import { ShippingAddressService } from '../../../../../core/services/shippingaddress.service';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.scss']
})
export class AddAddressComponent implements OnInit {
  form!: FormGroup;
  item: any = {};
  isEdit!: boolean;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddAddressComponent>,
    private formBuilder: FormBuilder,
    public addressService: ShippingAddressService,
    private authService: AuthService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    if (data.isEdit) {
      this.item = { ...data.item };
    }
    data.isEdit ? (this.isEdit = true) : (this.isEdit = false);
    this.form = this.formBuilder.group({
      recipientName: new FormControl(
        this.item?.recipientName,
        Validators.compose([Validators.required])
      ),
      phoneNumber: new FormControl(
        this.item?.phoneNumber,
        Validators.compose([Validators.required])
      ),
      addressLine: new FormControl(
        this.item?.addressLine,
        Validators.compose([Validators.required])
      ),
      province: new FormControl(this.item?.province, Validators.compose([Validators.required])),
      district: new FormControl(this.item?.district, Validators.compose([Validators.required])),
      ward: new FormControl(this.item?.ward, Validators.compose([Validators.required])),
      isDefault: new FormControl(this.item?.isDefault, Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        return;
      }
    });
    this.loadProvinces();
  }

  loadProvinces() {
    this.http.get<any[]>('/api/p/').subscribe((data) => {
      this.provinces = data;
    });
  }

  onProvinceChange() {
    const selectedProvinceCode = this.form.get('province')?.value;
    this.districts = [];
    this.wards = [];
    this.form.patchValue({ district: '', ward: '' });

    if (selectedProvinceCode) {
      this.http.get<any>(`/api/p/${selectedProvinceCode}?depth=2`).subscribe((data) => {
        this.districts = data.districts;
      });
    }
  }

  onDistrictChange() {
    const selectedDistrictCode = this.form.get('district')?.value;
    this.wards = [];
    this.form.patchValue({ ward: '' });

    if (selectedDistrictCode) {
      this.http.get<any>(`/api/d/${selectedDistrictCode}?depth=2`).subscribe((data) => {
        this.wards = data.wards;
      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value;

    if (this.isEdit) {
      const updateItem = {
        userId: this.item.userId,
        id: this.item.id,
        recipientName: formValue.recipientName,
        phoneNumber: formValue.phoneNumber,
        addressLine: formValue.addressLine,
        province: formValue.province,
        district: formValue.district,
        ward: formValue.ward,
        isDefault: formValue.isDefault
      };
      console.log('edit address: ', updateItem);
      // this.settingService.post(updateItem).subscribe({
      //   next: (res) => this.processResponse(res),
      //   error: () => this.processResponse(false)
      // });
    } else {
      const addItem = {
        userId: this.item.userId,
        recipientName: formValue.recipientName,
        phoneNumber: formValue.phoneNumber,
        addressLine: formValue.addressLine,
        province: formValue.province,
        district: formValue.district,
        ward: formValue.ward,
        isDefault: formValue.isDefault
      };
      console.log('add address: ', addItem);
      // this.settingService.post(addItem).subscribe({
      //   next: (res) => {
      //     if (res.code === 200) {
      //       this.processResponse(res);
      //     } else {
      //       this.processResponse(false);
      //     }
      //   },
      //   error: () => this.processResponse(false)
      // });
    }
  }

  processResponse(res: any, msg?: string, isClose?: boolean) {
    const transForm = res
      ? !this.isEdit
        ? msg
          ? msg
          : this.translate.instant('Message.AddSuccess')
        : msg
          ? msg
          : this.translate.instant('Message.EditSuccess')
      : !this.isEdit
        ? msg
          ? msg
          : this.translate.instant('Message.AddFail')
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
