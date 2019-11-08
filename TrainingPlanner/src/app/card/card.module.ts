import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubCardListComponent } from './club-card-list/club-card-list.component';
import { ClubCardListItemComponent } from './club-card-list/club-card-list-item/club-card-list-item.component';
import { TrainerCardListComponent } from './trainer-card-list/trainer-card-list.component';
import { TrainerCardListItemComponent } from './trainer-card-list/trainer-card-list-item/trainer-card-list-item.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';

const routes: Routes = [
  {
    path: 'users/:id/club_cards',
    component: ClubCardListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users/:id/trainer_cards',
    component: TrainerCardListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'clubs/:id/cards',
    component: ClubCardListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trainers/:id/cards',
    component: TrainerCardListComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    ClubCardListComponent,
    ClubCardListItemComponent,
    TrainerCardListComponent,
    TrainerCardListItemComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ClubCardListComponent, TrainerCardListComponent]
})
export class CardModule {}
