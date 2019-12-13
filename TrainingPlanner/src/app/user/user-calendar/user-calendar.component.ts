import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TrainingService } from 'src/app/services/Training.service';
import { Training } from 'src/app/models/Training/Training';
import { TrainingDetailsDialogComponent } from 'src/app/shared/training-details-dialog/training-details-dialog.component';
import { UserCalendarTraining } from 'src/app/models/UserStuff/UserCalendarTraining/UserCalendarTraining';
import { UserCalendarTrainingService } from 'src/app/services/UserCalendarTraining.service';
import { DeleteUserCalendarTrainingDialogComponent } from 'src/app/shared/delete-user-calendar-training-dialog/delete-user-calendar-training-dialog.component';
import { UserCalendarTrainingDetailsDialogComponent } from 'src/app/shared/user-calendar-training-details-dialog/user-calendar-training-details-dialog.component';
import { TrainingFilterData } from 'src/app/models/FilterData/TrainingFilterData';

@Component({
  selector: 'app-user-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit {
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Deleted', event);
      }
    }
  ];

  ngForm: FormGroup;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = false;

  trainings: Training[];
  userId: string;
  isLoaded: boolean;
  isUserCalendarTrainingsLoaded: boolean;

  userCalendarTrainings: UserCalendarTraining[];

  filterData: TrainingFilterData = {};

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private userCalendarTrainingService: UserCalendarTrainingService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.trainingService
      .getReservedTrainings(this.userId, this.filterData)
      .subscribe(response => {
        this.trainings = response;
        this.trainings.forEach(t => {
          this.events.push({
            start: new Date(t.startDate),
            end: new Date(t.endDate),
            title: t.title,
            color: {
              primary: t.primaryColor,
              secondary: t.secondaryColor
            },
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: false,
              afterEnd: false
            },
            draggable: false,
            id: t.id
          });
        });
        this.isLoaded = true;
        this.getUserCalendarTrainings();
        this.viewDate = new Date();
        this.changeDetectorRef.detectChanges();
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (action === 'Clicked' && event.actions === null) {
      this.openDetailsDialog(event);
    } else if (action === 'Clicked' && event.actions !== null) {
      this.openUserCalendarDetailsDialog(event);
    } else if (action === 'Edited') {
      const userTrainingId = this.userCalendarTrainings.find(
        t => t.id === event.id
      ).userTrainingId;
      this.router.navigate([
        `training_creator/${userTrainingId}/edit/${event.id}`
      ]);
    } else if (action === 'Deleted') {
      this.openDeleteDialog(event);
    } else {
    }
  }

  openDeleteDialog(eventToDelete: CalendarEvent) {
    const dialogRef = this.dialog.open(
      DeleteUserCalendarTrainingDialogComponent,
      {
        width: '400px',
        data: {
          trainingEvent: eventToDelete,
          events: this.events,
          errorMsg:
            'Do you really want to delete this training? This process cannot be undone.'
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Delete') {
          this.activeDayIsOpen = false;
          this.refresh.next();
          this.changeDetectorRef.detectChanges();
        }
      }
    });
  }

  openUserCalendarDetailsDialog(event: CalendarEvent) {
    const id = event.id.toString();
    this.userCalendarTrainingService
      .getUserCalendarTraining(parseInt(id, 10))
      .subscribe(response => {
        this.dialog.open(UserCalendarTrainingDetailsDialogComponent, {
          width: '400px',
          data: {
            training: response,
            startDate: new Date(response.startDate).toLocaleDateString(),
            endDate: new Date(response.endDate).toLocaleDateString(),
            startTime: this.getStringFromDate(new Date(response.startDate)),
            endTime: this.getStringFromDate(new Date(response.endDate))
          }
        });
      });
  }

  openDetailsDialog(event: CalendarEvent) {
    const id = event.id.toString();
    this.trainingService.getTraining(parseInt(id, 10)).subscribe(response => {
      const dialogRef = this.dialog.open(TrainingDetailsDialogComponent, {
        width: '400px',
        data: {
          training: response,
          trainingEvent: event,
          isUserCalendar: true,
          events: this.events,
          startDate: new Date(response.startDate).toLocaleDateString(),
          endDate: new Date(response.endDate).toLocaleDateString(),
          startTime: this.getStringFromDate(new Date(response.startDate)),
          endTime: this.getStringFromDate(new Date(response.endDate))
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          if (result.event === 'Delete') {
            this.activeDayIsOpen = false;
            this.refresh.next();
            this.changeDetectorRef.detectChanges();
          }
        }
      });
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getStringFromDate(date: Date) {
    let hour = new Date(date).getHours();
    const min = new Date(date).getMinutes();
    let ampm = ' AM';
    let hourString = hour.toString();
    let minString = min.toString();
    if (hour > 12) {
      hour -= 12;
      ampm = ' PM';
    }
    if (hour === 0) {
      hour = 12;
      ampm = ' PM';
    }
    if (hour < 10) {
      hourString = '0' + hour;
    }
    if (min < 10) {
      minString = '0' + min;
    }
    return hourString + ':' + minString + ampm;
  }

  getUserCalendarTrainings() {
    this.userCalendarTrainingService
      .getUserCalendarTrainings(this.userId)
      .subscribe(response => {
        this.userCalendarTrainings = response;
        this.userCalendarTrainings.forEach(t => {
          this.events.push({
            start: new Date(t.startDate),
            end: new Date(t.endDate),
            title: t.userTraining.name,
            color: {
              primary: t.primaryColor,
              secondary: t.secondaryColor
            },
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: false,
              afterEnd: false
            },
            draggable: false,
            id: t.id
          });
        });
        this.isUserCalendarTrainingsLoaded = true;
        this.viewDate = new Date();
        this.changeDetectorRef.detectChanges();
      });
  }
}
