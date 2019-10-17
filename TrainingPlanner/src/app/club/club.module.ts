import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ClubProfileComponent } from './club-profile/club-profile.component';

const routes: Routes = [
  {
    path: 'profile/clubs',
    component: ClubProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [ClubProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ClubProfileComponent]
})
export class ClubModule {}
