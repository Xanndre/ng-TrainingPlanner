import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { TrainingPartnerComponent } from './training-partner/training-partner.component';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'partners',
    component: TrainingPartnerComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [TrainingPartnerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [TrainingPartnerComponent]
})
export class PartnerModule {}
