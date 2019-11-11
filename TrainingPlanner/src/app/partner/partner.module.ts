import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { TrainingPartnerComponent } from './training-partner/training-partner.component';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TrainingPartnerComponent]
})
export class PartnerModule {}
