import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderClientComponent } from './components/header-client/header-client.component';
import { FooterClientComponent } from './components/footer-client/footer-client.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderClientComponent,
    FooterClientComponent,
    HeaderAdminComponent,
    AdminLayoutComponent,
    ClientLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule  
  ],
  exports: [
    
  ]
})
export class SharedModule { }
