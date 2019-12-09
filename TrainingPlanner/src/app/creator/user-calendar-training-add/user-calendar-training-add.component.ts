import { Component, OnInit } from '@angular/core';
import { UserCalendarTrainingAddForm } from './user-calendar-training-add-form';
import { UserCalendarTrainingAddControls } from './user-calendar-training-add-controls';
import { UserCalendarTraining } from 'src/app/models/UserStuff/UserCalendarTraining/UserCalendarTraining';
import { UserCalendarTrainingCreate } from 'src/app/models/UserStuff/UserCalendarTraining/UserCalendarTrainingCreate';
import { UserCalendarTrainingUpdate } from 'src/app/models/UserStuff/UserCalendarTraining/UserCalendarTrainingUpdate';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserCalendarTrainingService } from 'src/app/services/UserCalendarTraining.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-user-calendar-training-add',
  templateUrl: './user-calendar-training-add.component.html',
  styleUrls: ['./user-calendar-training-add.component.css']
})
export class UserCalendarTrainingAddComponent implements OnInit {
  trainingForm: UserCalendarTrainingAddForm = new UserCalendarTrainingAddForm();
  formControls: UserCalendarTrainingAddControls;

  eventId: number;
  training: UserCalendarTraining = null;
  trainingCreate: UserCalendarTrainingCreate;
  trainingUpdate: UserCalendarTrainingUpdate = new UserCalendarTrainingUpdate();
  beforeChanges: UserCalendarTraining;

  trainingId: number;

  isEdit = false;
  isLoaded: boolean;
  isEdited = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private userCalendarTrainingService: UserCalendarTrainingService
  ) {}

  ngOnInit() {
    this.trainingId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.eventId = parseInt(this.route.snapshot.paramMap.get('eventId'), 10);
    if (this.route.snapshot.data.edit) {
      this.isEdit = true;
      this.userCalendarTrainingService
        .getUserCalendarTraining(this.eventId)
        .subscribe(response => {
          this.training = response;
          this.training.startTime = this.getStringFromDate(response.startDate);
          this.training.endTime = this.getStringFromDate(response.endDate);
          this.formControls = new UserCalendarTrainingAddControls();
          this.trainingForm.buildForm(
            this.formBuilder,
            this.training,
            this.training.startTime,
            this.training.endTime
          );
          this.formControls.initializeControls(this.trainingForm);
          this.beforeChanges = JSON.parse(JSON.stringify(this.training));
          this.trainingForm.trainingForm.disable();
          this.isLoaded = true;
        });
    } else {
      this.formControls = new UserCalendarTrainingAddControls();
      this.trainingForm.buildForm(this.formBuilder, this.training, null, null);
      this.formControls.initializeControls(this.trainingForm);
      this.isLoaded = true;
    }
  }

  createTraining() {
    const dateStart = new Date(this.trainingForm.trainingForm.value.date);
    const dateEnd = new Date(this.trainingForm.trainingForm.value.date);

    const start = this.getDate(
      this.trainingForm.trainingForm.value.startTime,
      dateStart
    );
    const end = this.getDate(
      this.trainingForm.trainingForm.value.endTime,
      dateEnd
    );

    this.trainingCreate = {
      primaryColor: this.trainingForm.trainingForm.value.primaryColor,
      secondaryColor: this.trainingForm.trainingForm.value.secondaryColor,
      startDate: start,
      endDate: end,
      userTrainingId: this.trainingId
    };

    this.userCalendarTrainingService
      .createUserCalendarTraining(this.trainingCreate)
      .subscribe(
        () => {
          this.router.navigate(['/calendar']);
        },
        err => {
          if (err.error === 'Invalid dates') {
            this.showError('End date should be greater than start date.');
          } else {
            this.showError('Invalid training creation attempt.');
          }
        }
      );
  }

  getDate(time: string, date: Date) {
    const split = time.split(':', 2);
    let hour = parseInt(split[0], 10);
    const rest = split[1].split(' ', 2);
    const min = parseInt(rest[0], 10);
    const ampm = rest[1];
    if (ampm === 'PM') {
      if (hour === 12) {
        hour -= 12;
      } else {
        hour += 12;
      }
    }
    date.setHours(hour, min);
    return date;
  }

  getStringFromDate(date: Date) {
    let hour = new Date(date).getHours();
    const min = new Date(date).getMinutes();
    let ampm = ' AM';
    if (hour > 12) {
      hour -= 12;
      ampm = ' PM';
    }
    if (hour === 0) {
      hour = 12;
      ampm = ' PM';
    }
    return hour + ':' + min + ampm;
  }

  editTraining() {
    this.isEdited = true;
    this.setEditedData();
    this.trainingForm.trainingForm.enable();
  }

  setEditedData() {
    this.trainingUpdate.id = this.training.id;
    this.trainingUpdate.userTrainingId = this.trainingId;
    this.trainingUpdate.primaryColor = this.trainingForm.trainingForm.value.primaryColor;
    this.trainingUpdate.secondaryColor = this.trainingForm.trainingForm.value.secondaryColor;
    const dateStart = new Date(this.trainingForm.trainingForm.value.date);
    const dateEnd = new Date(this.trainingForm.trainingForm.value.date);
    const start = this.getDate(
      this.trainingForm.trainingForm.value.startTime,
      dateStart
    );
    const end = this.getDate(
      this.trainingForm.trainingForm.value.endTime,
      dateEnd
    );
    this.trainingUpdate.startDate = start;
    this.trainingUpdate.endDate = end;
  }

  cancel() {
    this.isEdited = false;
    this.trainingUpdate = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setTrainingData();
    this.trainingForm.trainingForm.markAsPristine();
    this.trainingForm.trainingForm.markAsUntouched();
    this.trainingForm.trainingForm.updateValueAndValidity();
    this.trainingForm.trainingForm.disable();
  }

  setTrainingData() {
    this.trainingForm.trainingForm.setValue({
      date: this.training.startDate,
      primaryColor: this.training.primaryColor,
      secondaryColor: this.training.secondaryColor,
      startTime: this.getStringFromDate(new Date(this.training.startDate)),
      endTime: this.getStringFromDate(new Date(this.training.endDate))
    });
  }

  saveTrainingData() {
    this.isEdited = false;
    this.setEditedData();
    this.userCalendarTrainingService
      .updateUserCalendarTraining(this.trainingUpdate)
      .subscribe(
        () => {
          this.router.navigate(['/calendar']);
        },
        err => {
          if (err.error === 'Invalid dates') {
            this.showError('End date should be greater than start date.');
            this.cancel();
          } else {
            this.showError('Invalid training edition attempt.');
          }
        }
      );
    this.beforeChanges = JSON.parse(JSON.stringify(this.training));
    this.trainingForm.trainingForm.disable();
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }
}
