import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderClientComponent } from './components/header-client/header-client.component';
import { FooterClientComponent } from './components/footer-client/footer-client.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AraAutocompleteComponent } from './components/AraAutocomplete/AraAutocomplete.component';
import { MatOptionModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IconsModule } from './icon.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularSplitModule } from 'angular-split';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    HeaderClientComponent,
    FooterClientComponent,
    HeaderAdminComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    AraAutocompleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    IconsModule,
    MatPaginatorModule,
    AngularSplitModule,
    MatCheckboxModule,
    MatTableModule,
    MatPseudoCheckboxModule
  ],
  exports: [
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    AraAutocompleteComponent,
    IconsModule,
    MatPaginatorModule,
    AngularSplitModule,
    MatCheckboxModule,
    MatTableModule,
    MatPseudoCheckboxModule
  ]
})
export class SharedModule {}
