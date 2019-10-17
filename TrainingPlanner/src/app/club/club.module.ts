import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { SharedModule } from '../shared/shared.module';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ClubProfileComponent]
})
export class ClubModule {}
