import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTrainingListComponent } from './user-training-list/user-training-list.component';
import { UserTrainingListItemComponent } from './user-training-list/user-training-list-item/user-training-list-item.component';
import { UserTrainingAddComponent } from './user-training-add/user-training-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatExpansionModule
} from '@angular/material';
import { DeleteUserTrainingDialogComponent } from '../shared/delete-user-training-dialog/delete-user-training-dialog.component';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ExerciseDialogComponent } from '../shared/exercise-dialog/exercise-dialog.component';
import { EditUserTrainingGuardService } from '../guards/EditUserTrainingGuard.service';
import { UserCalendarTrainingAddComponent } from './user-calendar-training-add/user-calendar-training-add.component';
import { UserCalendarTrainingAddRecurrentComponent } from './user-calendar-training-add-recurrent/user-calendar-training-add-recurrent.component';
import { UserCalendarTrainingDialogComponent } from './user-calendar-training-dialog/user-calendar-training-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const routes: Routes = [
  {
    path: 'training_creator',
    component: UserTrainingListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'training_creator/add',
    component: UserTrainingAddComponent,
    data: { edit: false },
    canActivate: [AuthGuardService]
  },
  {
    path: 'training_creator/edit/:id',
    component: UserTrainingAddComponent,
    data: { edit: true },
    canActivate: [AuthGuardService, EditUserTrainingGuardService]
  },
  {
    path: 'training_creator/:id/add',
    component: UserCalendarTrainingAddComponent,
    data: { edit: false },
    canActivate: [AuthGuardService, EditUserTrainingGuardService]
  },
  {
    path: 'training_creator/:id/edit/:eventId',
    component: UserCalendarTrainingAddComponent,
    data: { edit: true },
    canActivate: [AuthGuardService, EditUserTrainingGuardService]
  },
  {
    path: 'training_creator/:id/add_recurrent',
    component: UserCalendarTrainingAddRecurrentComponent,
    canActivate: [AuthGuardService, EditUserTrainingGuardService]
  }
];

@NgModule({
  declarations: [
    UserTrainingAddComponent,
    UserTrainingListComponent,
    UserTrainingListItemComponent,
    UserCalendarTrainingAddComponent,
    UserCalendarTrainingAddRecurrentComponent,
    UserCalendarTrainingDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    InfiniteScrollModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    UserTrainingAddComponent,
    UserTrainingListComponent,
    UserCalendarTrainingAddComponent,
    UserCalendarTrainingAddRecurrentComponent,
    UserCalendarTrainingDialogComponent
  ],
  entryComponents: [
    ErrorDialogComponent,
    DeleteUserTrainingDialogComponent,
    ExerciseDialogComponent,
    UserCalendarTrainingDialogComponent
  ]
})
export class CreatorModule {}
