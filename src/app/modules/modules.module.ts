import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminModule, AuthModule]
})
export class ModulesModule {}
