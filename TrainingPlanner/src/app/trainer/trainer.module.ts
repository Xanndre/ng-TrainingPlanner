import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerAddComponent } from './trainer-add/trainer-add.component';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule
} from '@angular/material';

const routes: Routes = [
  {
    path: 'profile/trainer',
    component: TrainerAddComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [TrainerAddComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [TrainerAddComponent]
})
export class TrainerModule {}
