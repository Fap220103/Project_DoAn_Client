import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangePassComponent implements OnInit {
  changePassForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.changePassForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {}
  onSubmit(): void {
    if (this.changePassForm.invalid) {
      return;
    }

    this.http.post('/api/account/changepass', this.changePassForm.value).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.changePassForm.reset();
        } else {
        }
      },
      error: () => {}
    });
  }
}
