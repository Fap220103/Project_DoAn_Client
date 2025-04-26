import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  addresses = [
    {
      name: 'Mẫn Anh Pháp',
      phone: '+84 833 220 103',
      addressLine1: 'Số 52, Đường Lạc Long Quân',
      addressLine2: 'Phường Bưởi, Quận Tây Hồ, Hà Nội',
      isDefault: true,
      isPickup: false,
      isReturn: false
    },
    {
      name: 'Mẫn Thị Hương',
      phone: '+84 357 829 687',
      addressLine1: 'Mẫn xá văn môn yên phong Bắc ninh',
      addressLine2: 'Xã Văn Môn, Huyện Yên Phong, Bắc Ninh',
      isDefault: false,
      isPickup: true,
      isReturn: true
    },
    {
      name: 'Mẫn Anh Pháp',
      phone: '+84 833 220 103',
      addressLine1: 'Số Nhà 9, Ngõ 46 Xuân Phương',
      addressLine2: 'Phường Phương Canh, Quận Nam Từ Liêm, Hà Nội',
      isDefault: false,
      isPickup: false,
      isReturn: false
    }
    // ... thêm các địa chỉ khác tương tự
  ];
  constructor() {}

  ngOnInit() {}
}
