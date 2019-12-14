import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubCardListComponent } from './club-card-list/club-card-list.component';
import { ClubCardListItemComponent } from './club-card-list/club-card-list-item/club-card-list-item.component';
import { TrainerCardListComponent } from './trainer-card-list/trainer-card-list.component';
import { TrainerCardListItemComponent } from './trainer-card-list/trainer-card-list-item/trainer-card-list-item.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import {
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule
} from '@angular/material';
import { CardListComponent } from './card-list/card-list.component';
import { TrainerCardDialogComponent } from '../shared/trainer-card-dialog/trainer-card-dialog.component';
import { ClubCardDialogComponent } from '../shared/club-card-dialog/club-card-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardDetailsComponent } from './card-details/card-details.component';
import { ClubGuardService } from '../guards/ClubGuard.service';
import { TrainerGuardService } from '../guards/TrainerGuard.service';
import { FormsModule } from '@angular/forms';
import { CardFiltersComponent } from './card-filters/card-filters.component';

const routes: Routes = [
  {
    path: 'clubs/:clubId/cards',
    component: ClubCardListComponent,
    data: { isUser: false, isClub: true },
    canActivate: [AuthGuardService, ClubGuardService]
  },
  {
    path: 'trainers/:trainerId/cards',
    component: TrainerCardListComponent,
    data: { isUser: false, isTrainer: true },
    canActivate: [AuthGuardService, TrainerGuardService]
  },
  {
    path: 'users/:id/club_cards/clubs/:clubId',
    component: ClubCardListComponent,
    data: { isUser: true, isClub: true },
    canActivate: [AuthGuardService, ClubGuardService]
  },
  {
    path: 'users/:id/trainer_cards/trainers/:trainerId',
    component: TrainerCardListComponent,
    data: { isUser: true, isTrainer: true },
    canActivate: [AuthGuardService, TrainerGuardService]
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
    CardListComponent,
    CardDetailsComponent,
    CardFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    NgbModule,
    InfiniteScrollModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    ClubCardListComponent,
    TrainerCardListComponent,
    CardListComponent,
    CardDetailsComponent
  ],
  entryComponents: [
    TrainerCardDialogComponent,
    ClubCardDialogComponent,
    CardDetailsComponent
  ]
})
export class CardModule {}
