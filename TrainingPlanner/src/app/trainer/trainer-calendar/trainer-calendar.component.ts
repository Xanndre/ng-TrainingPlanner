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
import { DeleteTrainingDialogComponent } from 'src/app/shared/delete-training-dialog/delete-training-dialog.component';

@Component({
  selector: 'app-trainer-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trainer-calendar.component.html',
  styleUrls: ['./trainer-calendar.component.css']
})
export class TrainerCalendarComponent implements OnInit {
  ngForm: FormGroup;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

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

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = false;

  trainerId: number;
  trainings: Training[];
  isEditable: boolean;
  isLoaded: boolean;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.trainerId = parseInt(
      this.route.snapshot.paramMap.get('trainerId'),
      10
    );
    this.isEditable = this.route.snapshot.data.editable;
    this.trainingService
      .getTrainerTrainings(this.trainerId)
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
            actions: this.isEditable ? this.actions : null,
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
      // tutaj otwieranie dialogu z detailsami
    } else if (action === 'Edited') {
      this.router.navigate([
        `profile/trainers/${this.trainerId}/calendar/trainings/${event.id}/edit`
      ]);
    } else if (action === 'Deleted') {
      this.openDeleteDialog(event);
    } else {
    }
  }

  openDeleteDialog(eventToDelete: CalendarEvent) {
    const dialogRef = this.dialog.open(DeleteTrainingDialogComponent, {
      width: '400px',
      data: {
        trainingId: eventToDelete.id,
        trainerId: this.trainerId,
        events: this.events,
        errorMsg:
          'Do you really want to delete this training? This process cannot be undone.'
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
  }

  goToAdd() {
    this.router.navigate([
      `profile/trainers/${this.trainerId}/calendar/trainings/add`
    ]);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
