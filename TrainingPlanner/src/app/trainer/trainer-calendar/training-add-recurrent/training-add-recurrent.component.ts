import { Component, OnInit } from '@angular/core';
import { TrainingAddRecurrentControls } from './training-add-recurrent-controls';
import { TrainingAddRecurrentForm } from './training-add-recurrent-form';
import { TrainingCreate } from 'src/app/models/Training/TrainingCreate';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { TrainingService } from 'src/app/services/Training.service';
import { TrainerService } from 'src/app/services/Trainer.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-training-add-recurrent',
  templateUrl: './training-add-recurrent.component.html',
  styleUrls: ['./training-add-recurrent.component.css']
})
export class TrainingAddRecurrentComponent implements OnInit {
  trainingForm: TrainingAddRecurrentForm = new TrainingAddRecurrentForm();
  formControls: TrainingAddRecurrentControls;

  trainingsCreate: TrainingCreate[] = [];
  trainerId: number;
  trainerName: string;

  startDays: Date[] = [];

  isLoaded: boolean;
  isTrainerLoaded: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private trainerService: TrainerService,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.trainerId = parseInt(
      this.route.snapshot.paramMap.get('trainerId'),
      10
    );
    this.getTrainer();
    this.formControls = new TrainingAddRecurrentControls();
    this.trainingForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.trainingForm);
    this.isLoaded = true;
  }

  createTraining() {
    this.startDays = this.getRecurrentMonthDays(
      this.trainingForm.trainingForm.value.day
    );

    this.startDays.forEach(day => {
      const dateStart = new Date(day);
      const dateEnd = new Date(day);

      const start = this.getDate(
        this.trainingForm.trainingForm.value.startTime,
        dateStart
      );
      const end = this.getDate(
        this.trainingForm.trainingForm.value.endTime,
        dateEnd
      );

      const trainingCreate = {
        title: this.trainingForm.trainingForm.value.title,
        room: this.trainingForm.trainingForm.value.room,
        entries: this.trainingForm.trainingForm.value.entries,
        level: this.trainingForm.trainingForm.value.level,
        primaryColor: this.trainingForm.trainingForm.value.primaryColor,
        secondaryColor: this.trainingForm.trainingForm.value.secondaryColor,
        clubId: null,
        startDate: start,
        endDate: end,
        trainerId: this.trainerId,
        trainerName: this.trainerName
      };
      this.trainingsCreate.push(trainingCreate);
    });

    this.trainingService.createTrainingRange(this.trainingsCreate).subscribe(
      () => {
        this.router.navigate([`/profile/trainers/${this.trainerId}/calendar`]);
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

  getTrainer() {
    this.trainerService.getTrainer(this.trainerId).subscribe(response => {
      this.trainerName = response.user.firstName + ' ' + response.user.lastName;
      this.isTrainerLoaded = true;
    });
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  getRecurrentMonthDays(day: string) {
    const weekDays = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7
    };

    const chosenDay = weekDays[day];
    const d = new Date();
    const month = d.getMonth();
    const days = [];

    d.setDate(1);

    while (d.getDay() !== chosenDay) {
      d.setDate(d.getDate() + 1);
    }

    while (d.getMonth() === month) {
      const pushDate = new Date(d.getTime());
      days.push(
        pushDate.getMonth() +
          1 +
          '-' +
          pushDate.getDate() +
          '-' +
          pushDate.getFullYear()
      );
      d.setDate(d.getDate() + 7);
    }

    return days;
  }
}
