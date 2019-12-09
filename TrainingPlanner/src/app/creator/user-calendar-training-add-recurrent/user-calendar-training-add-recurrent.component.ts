import { Component, OnInit } from '@angular/core';
import { UserCalendarTrainingAddRecurrentControls } from './user-calendar-training-add-recurrent-controls';
import { UserCalendarTrainingAddRecurrentForm } from './user-calendar-training-add-recurrent-form';
import { UserCalendarTrainingCreate } from 'src/app/models/UserStuff/UserCalendarTraining/UserCalendarTrainingCreate';
import { FormBuilder } from '@angular/forms';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserCalendarTrainingService } from 'src/app/services/UserCalendarTraining.service';

@Component({
  selector: 'app-user-calendar-training-add-recurrent',
  templateUrl: './user-calendar-training-add-recurrent.component.html',
  styleUrls: ['./user-calendar-training-add-recurrent.component.css']
})
export class UserCalendarTrainingAddRecurrentComponent implements OnInit {
  trainingForm: UserCalendarTrainingAddRecurrentForm = new UserCalendarTrainingAddRecurrentForm();
  formControls: UserCalendarTrainingAddRecurrentControls;

  trainingsCreate: UserCalendarTrainingCreate[] = [];
  trainingId: number;
  startDays: Date[] = [];
  isLoaded: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private userCalendarTrainingService: UserCalendarTrainingService
  ) {}

  ngOnInit() {
    this.trainingId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.formControls = new UserCalendarTrainingAddRecurrentControls();
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
        primaryColor: this.trainingForm.trainingForm.value.primaryColor,
        secondaryColor: this.trainingForm.trainingForm.value.secondaryColor,
        startDate: start,
        endDate: end,
        userTrainingId: this.trainingId
      };
      this.trainingsCreate.push(trainingCreate);
    });

    this.userCalendarTrainingService
      .createUserCalendarTrainingRange(this.trainingsCreate)
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
