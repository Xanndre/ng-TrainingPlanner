import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomControlComponent } from './custom-control/custom-control.component';
import { CustomErrorComponent } from './custom-error/custom-error.component';
import { CustomControlGroupComponent } from './custom-control-group/custom-control-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  exports: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent
  ]
})
export class SharedModule {}
