import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-AraAutocomplete',
  templateUrl: './AraAutocomplete.component.html',
  styleUrls: ['./AraAutocomplete.component.scss']
})
export class AraAutocompleteComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() displayField: string[] = []; // Mảng các key muốn hiển thị
  @Input() valueField: string = ''; // Key của giá trị (hoặc có thể là mảng nếu cần)
  @Input() value: any; // Giá trị hiện hành
  @Input() items: any[] = []; // Danh sách item hiển thị
  @Input() isUseForm: boolean = true; // Xác định có sử dụng Reactive Form hay ko (theo nhu cầu của bạn)
  @Input() isFirstLoad: boolean = true; // Tùy chọn load lần đầu

  @Input() dynamicOptionTemplate: TemplateRef<any> | null = null;

  // Output cho sự kiện thay đổi
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  mainControl: FormControl = new FormControl();

  @ViewChild('auto') auto!: MatAutocomplete;

  constructor() {}

  ngOnInit(): void {
    // if (this.value) {
    //   const selectedItem = this.items.find(item => item[this.valueField] === this.value);
    //   this.mainControl.setValue(selectedItem || this.value);
    //   this.mainControl.setValue(this.value);
    // }
    if (this.value !== null && this.value !== undefined) {
      const selectedItem = this.items.find(item => item[this.valueField] === this.value);
      this.mainControl.setValue(selectedItem || this.value);
    }
    
    this.mainControl.valueChanges.subscribe((val) => {
      this.onChange.emit(val);
    });
  }

  displayWith = (option: any) => {
    if (!option) return '';
    return this.displayField.map((field) => option[field]).join(' ');
  };

  displayPlaceholder(): string {
    return this.placeholder;
  }

  optionSelected(event: any) {
    const selected = event.option.value;
    const output = this.valueField ? selected[this.valueField] : selected;
    this.onChange.emit(output);
  }

  clear() {
    this.mainControl.setValue(null);
    this.onChange.emit(null);
  }
}
