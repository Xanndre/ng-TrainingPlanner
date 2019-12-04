import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { SharedModule } from '../shared/shared.module';
import {
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  DateAdapter,
  MatTabsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClubTrainerDialogComponent } from '../shared/club-trainer-dialog/club-trainer-dialog.component';
import { ClubActivityDialogComponent } from '../shared/club-activity-dialog/club-activity-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PicturesComponent } from './club-profile/pictures/pictures.component';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubListItemComponent } from './club-list/club-list-item/club-list-item.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DeleteClubDialogComponent } from '../shared/delete-club-dialog/delete-club-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClubReviewListComponent } from './club-review-list/club-review-list.component';
import { ClubReviewListItemComponent } from './club-review-list/club-review-list-item/club-review-list-item.component';
import { ReviewDialogComponent } from '../shared/review-dialog/review-dialog.component';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ClubGuardService } from '../guards/ClubGuard.service';
import { ClubCalendarComponent } from './club-calendar/club-calendar.component';
import { TrainingAddComponent } from './club-calendar/training-add/training-add.component';
import { DeleteTrainingDialogComponent } from '../shared/delete-training-dialog/delete-training-dialog.component';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TrainingDetailsDialogComponent } from '../shared/training-details-dialog/training-details-dialog.component';
import { SignedUserListComponent } from './club-calendar/signed-user-list/signed-user-list.component';
import { UserModule } from '../user/user.module';

const routes: Routes = [
  {
    path: 'profile/clubs',
    component: ClubProfileComponent,
    data: { isUser: true, edit: false, add: false },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/clubs/add',
    component: ClubProfileComponent,
    data: { edit: false, add: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/clubs/edit/:clubId',
    component: ClubProfileComponent,
    data: { edit: true, add: false },
    canActivate: [AuthGuardService, ClubGuardService]
  },
  {
    path: 'clubs',
    component: ClubListComponent,
    data: { isUser: false }
  },
  {
    path: 'clubs/:id',
    component: ClubDetailsComponent
  },
  {
    path: 'clubs/:id/reviews',
    component: ClubReviewListComponent
  },
  {
    path: 'profile/clubs/:clubId/calendar',
    component: ClubCalendarComponent,
    data: { editable: true },
    canActivate: [AuthGuardService, ClubGuardService]
  },
  {
    path: 'profile/clubs/:clubId/calendar/trainings/add',
    component: TrainingAddComponent,
    canActivate: [AuthGuardService, ClubGuardService],
    data: { edit: false }
  },
  {
    path: 'profile/clubs/:clubId/calendar/trainings/:id/edit',
    component: TrainingAddComponent,
    canActivate: [AuthGuardService, ClubGuardService],
    data: { edit: true }
  },
  {
    path: 'profile/clubs/:clubId/calendar/trainings/:id/users',
    component: SignedUserListComponent,
    canActivate: [AuthGuardService, ClubGuardService]
  },
  {
    path: 'clubs/:clubId/calendar',
    component: ClubCalendarComponent,
    data: { editable: false },
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    ClubProfileComponent,
    PicturesComponent,
    ClubDetailsComponent,
    ClubListComponent,
    ClubListItemComponent,
    ClubReviewListComponent,
    ClubReviewListItemComponent,
    ClubCalendarComponent,
    TrainingAddComponent,
    SignedUserListComponent
  ],
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    NgbModule,
    MatTableModule,
    MatButtonModule,
    DragDropModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    UserModule
  ],
  exports: [
    ClubProfileComponent,
    ClubDetailsComponent,
    ClubListComponent,
    ClubReviewListComponent,
    ClubCalendarComponent
  ],
  entryComponents: [
    ClubTrainerDialogComponent,
    ClubActivityDialogComponent,
    ReviewDialogComponent,
    DeleteClubDialogComponent,
    ErrorDialogComponent,
    DeleteTrainingDialogComponent,
    TrainingDetailsDialogComponent
  ]
})
export class ClubModule {}
