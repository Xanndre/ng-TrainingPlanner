import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerAddComponent } from './trainer-add/trainer-add.component';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: 'trainer/add',
    component: TrainerAddComponent,
    canActivate: [AuthGuardService],
    data: { edit: false }
  },
  {
    path: 'trainer/edit',
    component: TrainerAddComponent,
    canActivate: [AuthGuardService],
    data: { edit: true }
  }
];

@NgModule({
  declarations: [TrainerAddComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [TrainerAddComponent]
})
export class TrainerModule {}
