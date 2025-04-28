import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AraAutocompleteComponent } from './components/AraAutocomplete/AraAutocomplete.component';
import {
  MatOptionModule,
  MatPseudoCheckboxModule,
  provideNativeDateAdapter
} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IconsModule } from './icon.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularSplitModule } from 'angular-split';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AraAutocompleteComponent],
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
    MatPseudoCheckboxModule,
    CKEditorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
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
    MatPseudoCheckboxModule,
    CKEditorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  providers: [DatePipe, provideNativeDateAdapter()]
})
export class SharedModule {}
