import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerAddComponent } from './trainer-add/trainer-add.component';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: 'trainer/add',
    component: TrainerAddComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [TrainerAddComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule],
  exports: [TrainerAddComponent]
})
export class TrainerModule {}
