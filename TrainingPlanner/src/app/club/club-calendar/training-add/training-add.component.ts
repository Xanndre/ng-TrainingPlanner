import { Component, OnInit } from '@angular/core';
import { TrainingAddForm } from './training-add-form';
import { TrainingAddControls } from './training-add-controls';
import { Training } from 'src/app/models/Training/Training';
import { TrainingCreate } from 'src/app/models/Training/TrainingCreate';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TrainingService } from 'src/app/services/Training.service';
import { ClubService } from 'src/app/services/Club.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { TrainingUpdate } from 'src/app/models/Training/TrainingUpdate';

@Component({
  selector: 'app-training-add',
  templateUrl: './training-add.component.html',
  styleUrls: ['./training-add.component.css']
})
export class TrainingAddComponent implements OnInit {
  trainingForm: TrainingAddForm = new TrainingAddForm();
  formControls: TrainingAddControls;

  trainingId: number;
  training: Training = null;
  trainingCreate: TrainingCreate;
  trainingUpdate: TrainingUpdate = new TrainingUpdate();
  beforeChanges: Training;
  clubId: number;
  trainers: string[];

  isEdit = false;
  isLoaded: boolean;
  isTrainerNamesLoaded: boolean;
  isEdited = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private clubService: ClubService,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.clubId = parseInt(this.route.snapshot.paramMap.get('clubId'), 10);
    this.trainingId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (this.route.snapshot.data.edit) {
      this.isEdit = true;
      this.trainingService.getTraining(this.trainingId).subscribe(response => {
        this.training = response;
        this.training.startTime = this.getStringFromDate(response.startDate);
        this.training.endTime = this.getStringFromDate(response.endDate);
        this.formControls = new TrainingAddControls();
        this.trainingForm.buildForm(
          this.formBuilder,
          this.training,
          this.training.startTime,
          this.training.endTime
        );
        this.getTrainerNames();
        this.isLoaded = true;
      });
    } else {
      this.getTrainerNames();
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
      title: this.trainingForm.trainingForm.value.title,
      room: this.trainingForm.trainingForm.value.room,
      entries: this.trainingForm.trainingForm.value.entries,
      level: this.trainingForm.trainingForm.value.level,
      primaryColor: this.trainingForm.trainingForm.value.primaryColor,
      secondaryColor: this.trainingForm.trainingForm.value.secondaryColor,
      clubId: this.clubId,
      startDate: start,
      endDate: end,
      trainerId: null,
      trainerName: this.trainingForm.trainingForm.value.trainer
    };

    this.trainingService.createTraining(this.trainingCreate).subscribe(
      () => {
        this.router.navigate([`/profile/clubs/${this.clubId}/calendar`]);
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

  getTrainerNames() {
    this.clubService.getClubTrainerNames(this.clubId).subscribe(response => {
      this.trainers = response;
      if (this.isEdit) {
        this.formControls.initializeControls(this.trainingForm, this.trainers);
        this.beforeChanges = JSON.parse(JSON.stringify(this.training));
        this.trainingForm.trainingForm.disable();
      } else {
        this.formControls = new TrainingAddControls();
        this.trainingForm.buildForm(
          this.formBuilder,
          this.training,
          null,
          null
        );
        this.formControls.initializeControls(this.trainingForm, this.trainers);
      }

      this.isTrainerNamesLoaded = true;
    });
  }

  editTraining() {
    this.isEdited = true;
    this.setEditedData();
    this.trainingForm.trainingForm.enable();
  }

  setEditedData() {
    this.trainingUpdate.id = this.training.id;
    this.trainingUpdate.trainerId = this.training.trainerId;
    this.trainingUpdate.trainerName = this.trainingForm.trainingForm.value.trainer;
    this.trainingUpdate.clubId = this.training.clubId;
    this.trainingUpdate.title = this.trainingForm.trainingForm.value.title;
    this.trainingUpdate.room = this.trainingForm.trainingForm.value.room;
    this.trainingUpdate.level = this.trainingForm.trainingForm.value.level;
    this.trainingUpdate.entries = this.trainingForm.trainingForm.value.entries;
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
      title: this.training.title,
      entries: this.training.entries,
      room: this.training.room,
      level: this.training.level,
      date: this.training.startDate,
      primaryColor: this.training.primaryColor,
      secondaryColor: this.training.secondaryColor,
      trainer: this.training.trainerName,
      startTime: this.getStringFromDate(new Date(this.training.startDate)),
      endTime: this.getStringFromDate(new Date(this.training.endDate))
    });
  }

  saveTrainingData() {
    this.isEdited = false;
    this.setEditedData();
    this.trainingService.updateTraining(this.trainingUpdate).subscribe(
      () => {
        this.router.navigate([`/profile/clubs/${this.clubId}/calendar`]);
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
