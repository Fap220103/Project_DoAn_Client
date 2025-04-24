import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminModule, AuthModule, ClientModule]
})
export class ModulesModule {}
