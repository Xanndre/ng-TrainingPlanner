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
import { TrainerReviewListComponent } from './trainer-review-list/trainer-review-list.component';
import { TrainerReviewListItemComponent } from './trainer-review-list/trainer-review-list-item/trainer-review-list-item.component';
import { ReviewDialogComponent } from '../shared/review-dialog/review-dialog.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TrainerCalendarComponent } from './trainer-calendar/trainer-calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';

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
  },
  {
    path: 'trainers/:id/reviews',
    component: TrainerReviewListComponent
  },
  {
    path: 'profile/trainer/calendar',
    component: TrainerCalendarComponent
  }
];

@NgModule({
  declarations: [
    TrainerProfileComponent,
    TrainerListComponent,
    TrainerListItemComponent,
    TrainerDetailsComponent,
    TrainerReviewListComponent,
    TrainerReviewListItemComponent,
    TrainerCalendarComponent
  ],
  imports: [
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    NgbModule,
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
    TrainerDetailsComponent,
    TrainerReviewListComponent,
    TrainerCalendarComponent
  ],
  entryComponents: [
    DeleteTrainerDialogComponent,
    ReviewDialogComponent,
    ErrorDialogComponent
  ]
})
export class TrainerModule {}
