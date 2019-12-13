import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeleteUserDialogComponent } from '../shared/delete-user-dialog/delete-user-dialog.component';
import { UserListItemComponent } from './user-list/user-list-item/user-list-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TrainerGuardService } from '../guards/TrainerGuard.service';
import { ClubGuardService } from '../guards/ClubGuard.service';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DeleteUserCalendarTrainingDialogComponent } from '../shared/delete-user-calendar-training-dialog/delete-user-calendar-training-dialog.component';
import { UserCalendarTrainingDetailsDialogComponent } from '../shared/user-calendar-training-details-dialog/user-calendar-training-details-dialog.component';
import { UserFiltersComponent } from './user-list/user-filters/user-filters.component';

const routes: Routes = [
  {
    path: 'profile/user',
    component: UserProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'profile/user',
    pathMatch: 'full'
  },
  {
    path: 'clubs/:clubId/users',
    component: UserListComponent,
    canActivate: [AuthGuardService, ClubGuardService]
  },
  {
    path: 'trainers/:trainerId/users',
    component: UserListComponent,
    canActivate: [AuthGuardService, TrainerGuardService]
  },
  {
    path: 'calendar',
    component: UserCalendarComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    UserProfileComponent,
    UserListComponent,
    UserListItemComponent,
    UserCalendarComponent,
    UserFiltersComponent
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
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NgbModule,
    InfiniteScrollModule
  ],
  exports: [UserProfileComponent, UserListComponent, UserCalendarComponent],
  entryComponents: [
    DeleteUserDialogComponent,
    DeleteUserCalendarTrainingDialogComponent,
    UserCalendarTrainingDetailsDialogComponent
  ]
})
export class UserModule {}
