import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomControlComponent } from './custom-control/custom-control.component';
import { CustomErrorComponent } from './custom-error/custom-error.component';
import { CustomControlGroupComponent } from './custom-control-group/custom-control-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { PricelistTableComponent } from './pricelist-table/pricelist-table.component';
import {
  MatChipsModule,
  MatTableModule,
  MatCheckboxModule
} from '@angular/material';
import { PricelistDialogComponent } from './pricelist-table/pricelist-dialog/pricelist-dialog.component';
import { SliderComponent } from './slider/slider.component';
import { SliderItemDirective } from './slider/slider-item.directive';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ClubActivityDialogComponent } from './club-activity-dialog/club-activity-dialog.component';
import { ClubTrainerDialogComponent } from './club-trainer-dialog/club-trainer-dialog.component';
import { WorkingHoursTableComponent } from './working-hours-table/working-hours-table.component';
import { DeleteTrainerDialogComponent } from './delete-trainer-dialog/delete-trainer-dialog.component';
import { DeleteClubDialogComponent } from './delete-club-dialog/delete-club-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ClubCardDialogComponent } from './club-card-dialog/club-card-dialog.component';
import { TrainerCardDialogComponent } from './trainer-card-dialog/trainer-card-dialog.component';
import { DeleteMeasurementDialogComponent } from './delete-measurement-dialog/delete-measurement-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DeleteTrainingDialogComponent } from './delete-training-dialog/delete-training-dialog.component';
import { TrainingDetailsDialogComponent } from './training-details-dialog/training-details-dialog.component';
import { DeleteUserTrainingDialogComponent } from './delete-user-training-dialog/delete-user-training-dialog.component';
import { ExerciseDialogComponent } from './exercise-dialog/exercise-dialog.component';
import { DeleteUserCalendarTrainingDialogComponent } from './delete-user-calendar-training-dialog/delete-user-calendar-training-dialog.component';
import { UserCalendarTrainingDetailsDialogComponent } from './user-calendar-training-details-dialog/user-calendar-training-details-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    DeleteClubDialogComponent,
    DeleteTrainerDialogComponent,
    DeleteUserDialogComponent,
    DeleteMeasurementDialogComponent,
    ClubActivityDialogComponent,
    ClubTrainerDialogComponent,
    ReviewDialogComponent,
    PricelistTableComponent,
    WorkingHoursTableComponent,
    PricelistDialogComponent,
    SliderComponent,
    SliderItemDirective,
    ClubCardDialogComponent,
    TrainerCardDialogComponent,
    DeleteTrainingDialogComponent,
    DeleteUserCalendarTrainingDialogComponent,
    DeleteUserTrainingDialogComponent,
    TrainingDetailsDialogComponent,
    UserCalendarTrainingDetailsDialogComponent,
    ExerciseDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    NgbModule,
    NgxMaterialTimepickerModule,
    ColorPickerModule
  ],
  exports: [
    CustomControlComponent,
    CustomErrorComponent,
    CustomControlGroupComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    DeleteTrainerDialogComponent,
    DeleteClubDialogComponent,
    DeleteUserDialogComponent,
    DeleteMeasurementDialogComponent,
    ClubTrainerDialogComponent,
    ClubActivityDialogComponent,
    ReviewDialogComponent,
    PricelistTableComponent,
    WorkingHoursTableComponent,
    SliderComponent,
    SliderItemDirective,
    ClubCardDialogComponent,
    TrainerCardDialogComponent,
    DeleteTrainingDialogComponent,
    DeleteUserCalendarTrainingDialogComponent,
    DeleteUserTrainingDialogComponent,
    TrainingDetailsDialogComponent,
    UserCalendarTrainingDetailsDialogComponent,
    ExerciseDialogComponent
  ],
  entryComponents: [PricelistDialogComponent]
})
export class SharedModule {}
