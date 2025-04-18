import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule]
})
export class AuthModule {}
