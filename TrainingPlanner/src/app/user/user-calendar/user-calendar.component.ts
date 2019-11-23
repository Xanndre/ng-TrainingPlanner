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
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingService } from 'src/app/services/Training.service';
import { Training } from 'src/app/models/Training/Training';
import { TrainingDetailsDialogComponent } from 'src/app/shared/training-details-dialog/training-details-dialog.component';

@Component({
  selector: 'app-user-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit {
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

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.trainingService
      .getReservedTrainings(this.userId)
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
    if (action === 'Clicked') {
      this.openDetailsDialog(event);
    } else {
    }
  }

  openDetailsDialog(event: CalendarEvent) {
    const id = event.id.toString();
    this.trainingService.getTraining(parseInt(id, 10)).subscribe(response => {
      this.dialog.open(TrainingDetailsDialogComponent, {
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
}
