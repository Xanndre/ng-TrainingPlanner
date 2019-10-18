import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { SharedModule } from '../shared/shared.module';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClubtrainerAddDialogComponent } from '../shared/clubtrainer-add-dialog/clubtrainer-add-dialog.component';

const routes: Routes = [
  {
    path: 'profile/clubs',
    component: ClubProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [ClubProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ClubProfileComponent],
  entryComponents: [ClubtrainerAddDialogComponent]
})
export class ClubModule {}
