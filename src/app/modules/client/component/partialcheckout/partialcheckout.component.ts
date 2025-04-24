import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-partialcheckout',
  templateUrl: './partialcheckout.component.html',
  styleUrls: ['./partialcheckout.component.scss']
})
export class PartialCheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  isSignedIn = false; // set true nếu user đã đăng nhập
  user: any = null; // nếu isSignedIn = true, set user từ localStorage hoặc API
  loading = false;
  showVNPayOptions = false;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  selectedProvince: string = '';
  selectedDistrict: string = '';
  selectedWard: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.checkoutForm = this.fb.group({
      customerName: [''],
      phone: [''],
      address: [''],
      email: [''],
      typePayment: ['1'],
      typePaymentVN: ['0'],
      province: [''],
      district: [''],
      ward: ['']
    });
  }
  ngOnInit() {
    this.loadProvinces();
  }

  onPaymentChange(event: any) {
    const selected = event.target.value;
    this.showVNPayOptions = selected === '2';
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;
    this.loading = true;

    // Gửi dữ liệu đến API
    // const formData = this.checkoutForm.value;

    // console.log('Submitting form: ', formData);

    // setTimeout(() => {
    //   this.loading = false;
    //   alert('Đặt hàng thành công!');
    // }, 2000);
  }
  loadProvinces() {
    this.http.get<any[]>('/api/p/').subscribe((data) => {
      console.log('Provinces:', data);
      this.provinces = data;
    });
  }

  onProvinceChange() {
    const selectedProvinceCode = this.checkoutForm.get('province')?.value;
    this.districts = [];
    this.wards = [];
    this.checkoutForm.patchValue({ district: '', ward: '' });

    if (selectedProvinceCode) {
      this.http.get<any>(`/api/p/${selectedProvinceCode}?depth=2`).subscribe((data) => {
        this.districts = data.districts;
      });
    }
  }

  onDistrictChange() {
    const selectedDistrictCode = this.checkoutForm.get('district')?.value;
    this.wards = [];
    this.checkoutForm.patchValue({ ward: '' });

    if (selectedDistrictCode) {
      this.http.get<any>(`/api/d/${selectedDistrictCode}?depth=2`).subscribe((data) => {
        this.wards = data.wards;
      });
    }
  }
}
