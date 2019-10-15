import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubAddComponent } from './club-add/club-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';

const routes: Routes = [
  {
    path: 'profile/clubs',
    component: ClubAddComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [ClubAddComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ClubAddComponent]
})
export class ClubModule {}
