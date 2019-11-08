import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubCardListComponent } from './club-card-list/club-card-list.component';
import { ClubCardListItemComponent } from './club-card-list/club-card-list-item/club-card-list-item.component';
import { TrainerCardListComponent } from './trainer-card-list/trainer-card-list.component';
import { TrainerCardListItemComponent } from './trainer-card-list/trainer-card-list-item/trainer-card-list-item.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  {
    path: 'clubs/:clubId/cards',
    component: ClubCardListComponent,
    data: { isUser: false, isClub: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'trainers/:trainerId/cards',
    component: TrainerCardListComponent,
    data: { isUser: false, isTrainer: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'users/:id/club_cards/clubs/:clubId',
    component: ClubCardListComponent,
    data: { isUser: true, isClub: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'users/:id/trainer_cards/trainers/:trainerId',
    component: TrainerCardListComponent,
    data: { isUser: true, isTrainer: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/cards',
    component: CardListComponent,
    data: { isUser: true, isTrainer: false, isClub: false },
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    ClubCardListComponent,
    ClubCardListItemComponent,
    TrainerCardListComponent,
    TrainerCardListItemComponent,
    CardListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule
  ],
  exports: [ClubCardListComponent, TrainerCardListComponent, CardListComponent]
})
export class CardModule {}
