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
        Validators.compose([Validators.required, Validators.pattern('^[0-9]{0,10}$')])
      ),
      addressLine: new FormControl(this.item?.addressLine),
      province: new FormControl(
        this.item?.provinceCode || '',
        Validators.compose([Validators.required])
      ),
      district: new FormControl(
        this.item?.districtCode || '',
        Validators.compose([Validators.required])
      ),
      ward: new FormControl(this.item?.wardCode || '', Validators.compose([Validators.required])),
      isDefault: new FormControl(this.item?.isDefault)
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

    if (this.isEdit) {
      this.loadDistrictsAndWards();
    }
  }
  loadDistrictsAndWards() {
    const selectedProvinceCode = this.item?.provinceCode;
    if (selectedProvinceCode) {
      this.http.get<any>(`/api/p/${selectedProvinceCode}?depth=2`).subscribe((data) => {
        this.districts = data.districts || [];
        const selectedDistrictCode = this.item?.districtCode;
        if (selectedDistrictCode) {
          this.form.patchValue({ district: selectedDistrictCode });

          this.http.get<any>(`/api/d/${selectedDistrictCode}?depth=2`).subscribe((districtData) => {
            this.wards = districtData.wards || [];
            this.form.patchValue({ ward: this.item?.wardCode });
          });
        }
      });
    }
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

    const selectedProvince = this.provinces.find((p) => p.code == formValue.province);
    const selectedDistrict = this.districts.find((d) => d.code == formValue.district);
    const selectedWard = this.wards.find((w) => w.code == formValue.ward);

    const provinceName = selectedProvince ? selectedProvince.name : '';
    const districtName = selectedDistrict ? selectedDistrict.name : '';
    const wardName = selectedWard ? selectedWard.name : '';

    if (this.isEdit) {
      const updateItem = {
        userId: this.item.userId,
        id: this.item.id,
        recipientName: formValue.recipientName,
        phoneNumber: formValue.phoneNumber,
        addressLine: formValue.addressLine,
        province: provinceName,
        district: districtName,
        ward: wardName,
        provinceCode: formValue.province,
        districtCode: formValue.district,
        wardCode: formValue.ward,
        isDefault: formValue.isDefault
      };
      this.addressService.updateShippingAddress(updateItem).subscribe({
        next: (res) => {
          if (res.code === 200) {
            this.processResponse(res);
          } else {
            this.processResponse(false);
          }
        },
        error: () => this.processResponse(false)
      });
    } else {
      const addItem = {
        userId: this.data.userId,
        recipientName: formValue.recipientName,
        phoneNumber: formValue.phoneNumber,
        addressLine: formValue.addressLine ?? '',
        province: provinceName,
        district: districtName,
        ward: wardName,
        provinceCode: formValue.province,
        districtCode: formValue.district,
        wardCode: formValue.ward,
        isDefault: formValue.isDefault ?? false
      };
      this.addressService.post(addItem).subscribe({
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
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Cho phép chỉ từ 0 đến 9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
