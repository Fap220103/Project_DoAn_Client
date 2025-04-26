import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-partialcheckout',
  templateUrl: './partialcheckout.component.html',
  styleUrls: ['./partialcheckout.component.scss']
})
export class PartialCheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  isSignedIn = true; // set true nếu user đã đăng nhập
  user: any = null; // nếu isSignedIn = true, set user từ localStorage hoặc API
  loading = false;
  showVNPayOptions = false;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  paymentMethod = 'cod';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.checkoutForm = this.fb.group({
      username: [''],
      phone: [''],
      address: [''],
      email: [''],
      paymentMethod: ['1'],
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

  checkOut() {
    if (this.checkoutForm.invalid) return;

    const infoCheckout = {
      customerId: this.authService.getUserId(),
      TypePayment: 1
    };
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
