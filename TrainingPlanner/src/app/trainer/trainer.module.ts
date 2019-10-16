import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TrainerListItemComponent } from './trainer-list/trainer-list-item/trainer-list-item.component';

const routes: Routes = [
  {
    path: 'profile/trainer',
    component: TrainerProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trainers',
    component: TrainerListComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    TrainerProfileComponent,
    TrainerListComponent,
    TrainerListItemComponent
  ],
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
  exports: [TrainerProfileComponent, TrainerListComponent],
  entryComponents: [DeleteDialogComponent]
})
export class TrainerModule {}
