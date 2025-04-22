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
  user: any = null;   // nếu isSignedIn = true, set user từ localStorage hoặc API
  loading = false;
  showVNPayOptions = false;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      customerName: [''],
      phone: [''],
      address: [''],
      email: [''],
      typePayment: ['1'],
      typePaymentVN: ['0']
    })
  }
  ngOnInit() {
  }

  onPaymentChange(event: any) {
    const selected = event.target.value;
    this.showVNPayOptions = selected === '2';
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;

    this.loading = true;

    // Gửi dữ liệu đến API
    const formData = this.checkoutForm.value;

    console.log('Submitting form: ', formData);

    setTimeout(() => {
      this.loading = false;
      alert('Đặt hàng thành công!');
    }, 2000);
  }
}
