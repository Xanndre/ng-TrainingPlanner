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

@NgModule({
  declarations: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule
  ],
  exports: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent
  ]
})
export class SharedModule {}
