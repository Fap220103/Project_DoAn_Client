import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ClientComponent } from './client.component';
import { PartialSubComponent } from './component/partialsub/partialsub.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ClientComponent, PartialSubComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: []
})
export class ClientModule {}
