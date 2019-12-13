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
import {
  MatChipsModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatTabsModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TrainerListItemComponent } from './trainer-list/trainer-list-item/trainer-list-item.component';
import { TrainerDetailsComponent } from './trainer-details/trainer-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DeleteTrainerDialogComponent } from '../shared/delete-trainer-dialog/delete-trainer-dialog.component';
import { TrainerReviewListComponent } from './trainer-review-list/trainer-review-list.component';
import { TrainerReviewListItemComponent } from './trainer-review-list/trainer-review-list-item/trainer-review-list-item.component';
import { ReviewDialogComponent } from '../shared/review-dialog/review-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TrainerCalendarComponent } from './trainer-calendar/trainer-calendar.component';
import { TrainingAddComponent } from './trainer-calendar/training-add/training-add.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DeleteTrainingDialogComponent } from '../shared/delete-training-dialog/delete-training-dialog.component';
import { TrainerGuardService } from '../guards/TrainerGuard.service';
import { TrainingDetailsDialogComponent } from '../shared/training-details-dialog/training-details-dialog.component';
import { SignedUserListComponent } from './trainer-calendar/signed-user-list/signed-user-list.component';
import { UserModule } from '../user/user.module';
import { TrainingAddRecurrentComponent } from './trainer-calendar/training-add-recurrent/training-add-recurrent.component';
import { TrainerFiltersComponent } from './trainer-list/trainer-filters/trainer-filters.component';
import { TrainerReviewFiltersComponent } from './trainer-review-list/trainer-review-filters/trainer-review-filters.component';
import { TrainingFiltersComponent } from './trainer-calendar/training-filters/training-filters.component';

const routes: Routes = [
  {
    path: 'profile/trainer',
    component: TrainerProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trainers',
    component: TrainerListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trainers/:id',
    component: TrainerDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trainers/:id/reviews',
    component: TrainerReviewListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/trainers/:trainerId/calendar',
    component: TrainerCalendarComponent,
    data: { editable: true },
    canActivate: [AuthGuardService, TrainerGuardService]
  },
  {
    path: 'profile/trainers/:trainerId/calendar/trainings/add',
    component: TrainingAddComponent,
    canActivate: [AuthGuardService, TrainerGuardService],
    data: { edit: false }
  },
  {
    path: 'profile/trainers/:trainerId/calendar/trainings/:id/edit',
    component: TrainingAddComponent,
    canActivate: [AuthGuardService, TrainerGuardService],
    data: { edit: true }
  },
  {
    path: 'trainers/:trainerId/calendar',
    component: TrainerCalendarComponent,
    data: { editable: false },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/trainers/:trainerId/calendar/trainings/:id/users',
    component: SignedUserListComponent,
    canActivate: [AuthGuardService, TrainerGuardService]
  },
  {
    path: 'profile/trainers/:trainerId/calendar/trainings/add_recurrent',
    component: TrainingAddRecurrentComponent,
    canActivate: [AuthGuardService, TrainerGuardService],
    data: { edit: false }
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
    TrainerCalendarComponent,
    TrainingAddComponent,
    TrainingAddRecurrentComponent,
    SignedUserListComponent,
    TrainerFiltersComponent,
    TrainerReviewFiltersComponent,
    TrainingFiltersComponent
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    NgbModule,
    InfiniteScrollModule,
    MatTableModule,
    MatExpansionModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxMaterialTimepickerModule,
    UserModule
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
    ErrorDialogComponent,
    DeleteTrainingDialogComponent,
    TrainingDetailsDialogComponent
  ]
})
export class TrainerModule {}
