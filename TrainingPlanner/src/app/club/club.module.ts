import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClubTrainerDialogComponent } from '../shared/club-trainer-dialog/club-trainer-dialog.component';
import { ClubActivityDialogComponent } from '../shared/club-activity-dialog/club-activity-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PicturesComponent } from './club-profile/pictures/pictures.component';

const routes: Routes = [
  {
    path: 'profile/clubs',
    component: ClubProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [ClubProfileComponent, PicturesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  exports: [ClubProfileComponent],
  entryComponents: [ClubTrainerDialogComponent, ClubActivityDialogComponent]
})
export class ClubModule {}
