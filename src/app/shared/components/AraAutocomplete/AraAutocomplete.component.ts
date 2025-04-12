import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-AraAutocomplete',
  templateUrl: './AraAutocomplete.component.html',
  styleUrls: ['./AraAutocomplete.component.css']
})
export class AraAutocompleteComponent implements OnInit {

  @Input() placeholder: string = '';
  @Input() displayField: string[] = []; // Mảng các key muốn hiển thị
  @Input() valueField: string = ''; // Key của giá trị (hoặc có thể là mảng nếu cần)
  @Input() value: any; // Giá trị hiện hành
  @Input() items: any[] = []; // Danh sách item hiển thị
  @Input() isUseForm: boolean = true; // Xác định có sử dụng Reactive Form hay ko (theo nhu cầu của bạn)
  @Input() isFirstLoad: boolean = true; // Tùy chọn load lần đầu

  // Nếu muốn dùng template tùy chỉnh cho option thì sử dụng property này
  @Input() dynamicOptionTemplate: TemplateRef<any> | null = null;

  // Output cho sự kiện thay đổi
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  mainControl: FormControl = new FormControl();
  
  @ViewChild('auto') auto!: MatAutocomplete;

  constructor() {}

  ngOnInit(): void {
    // Nếu có value truyền vào, cập nhật FormControl
    if (this.value) {
      this.mainControl.setValue(this.value);
    }
    
    // Lắng nghe thay đổi của form control
    this.mainControl.valueChanges.subscribe(val => {
      // Ở đây, bạn có thể thực hiện lọc dữ liệu, valid hay đơn giản chỉ là emit ra ngoài
      this.onChange.emit(val);
    });
  }

  // Hàm hiển thị text dựa theo displayField
  displayWith = (option: any) => {
    if (!option) return '';
    // Nếu có nhiều trường hiển thị, nối chúng lại (có thể tùy chỉnh theo yêu cầu)
    return this.displayField.map(field => option[field]).join(' ');
  };

  // Trả về placeholder xử lý theo logic nếu cần (có thể bổ sung thêm logic)
  displayPlaceholder(): string {
    return this.placeholder;
  }

  // Xử lý khi chọn option từ autocomplete
  optionSelected(event: any) {
    // Lấy option đã chọn, bạn có thể emit ra ngoài hoặc xử lý giá trị (ví dụ: lấy giá trị của valueField)
    const selected = event.option.value;
    // Nếu cần, convert sang dạng value chỉ cần trường valueField
    const output = this.valueField ? selected[this.valueField] : selected;
    this.onChange.emit(output);
  }

  // Nếu cần các hàm bổ trợ khác (clear, refresh...) có thể khai báo thêm tại đây

  // Ví dụ hàm clear
  clear() {
    this.mainControl.setValue(null);
    this.onChange.emit(null);
  }

}
