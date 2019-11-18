import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainerService } from 'src/app/services/Trainer.service';
import { Trainer } from 'src/app/models/Trainer/Trainer';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-trainer-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trainer-calendar.component.html',
  styleUrls: ['./trainer-calendar.component.css']
})
export class TrainerCalendarComponent implements OnInit {
  ngForm: FormGroup;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

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
        // this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      id: 0
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
      id: 1
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
      id: 2
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      id: 3
    }
  ];

  activeDayIsOpen = true;

  userId: string;
  trainer: Trainer;
  trainerId: number;
  trainerName: string;
  isLoaded = false;

  constructor(
    private modal: NgbModal,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trainerId = parseInt(
      this.route.snapshot.paramMap.get('trainerId'),
      10
    );
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

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (action === 'Edited') {
      this.router.navigate([
        `profile/trainer/calendar/trainings/${event.id}/edit`
      ]);
    } else if (action === 'Deleted') {
      // this.openDialog('Delete', event);
    } else {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  }

  goToAdd() {
    this.router.navigate([
      `profile/trainers/${this.trainerId}/calendar/trainings/add`
    ]);
  }

  deleteTraining(rowObj) {
    // tutaj implementacja usuwania treningu z bazy
  }

  addTraining(rowObj) {
    // tutaj implementacja dodawania treningu do bazy
  }

  editTraining(rowObj) {
    // tutaj implementacja edycji treningu
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    // this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
