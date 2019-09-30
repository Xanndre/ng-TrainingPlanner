import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomControlComponent } from './custom-control/custom-control.component';
import { CustomErrorComponent } from './custom-error/custom-error.component';
import { CustomControlGroupComponent } from './custom-control-group/custom-control-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent,
    ErrorDialogComponent
  ]
})
export class SharedModule { }
