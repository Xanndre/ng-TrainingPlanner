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
import { MatChipsModule, MatExpansionModule } from '@angular/material';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TrainerListItemComponent } from './trainer-list/trainer-list-item/trainer-list-item.component';
import { TrainerDetailsComponent } from './trainer-details/trainer-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DeleteTrainerDialogComponent } from '../shared/delete-trainer-dialog/delete-trainer-dialog.component';

const routes: Routes = [
  {
    path: 'profile/trainer',
    component: TrainerProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trainers',
    component: TrainerListComponent
  },
  {
    path: 'trainers/:id',
    component: TrainerDetailsComponent
  }
];

@NgModule({
  declarations: [
    TrainerProfileComponent,
    TrainerListComponent,
    TrainerListItemComponent,
    TrainerDetailsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    InfiniteScrollModule,
    MatTableModule,
    MatExpansionModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    TrainerProfileComponent,
    TrainerListComponent,
    TrainerDetailsComponent
  ],
  entryComponents: [DeleteTrainerDialogComponent]
})
export class TrainerModule {}
