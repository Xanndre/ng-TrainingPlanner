import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { WorkingHours } from 'src/app/models/WorkingHours';
import { ClubService } from 'src/app/services/Club.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-working-hours-table',
  templateUrl: './working-hours-table.component.html',
  styleUrls: ['./working-hours-table.component.css']
})
export class WorkingHoursTableComponent implements OnInit {
  theme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#fff',
      buttonColor: '#3f51b5'
    },
    dial: {
      dialBackgroundColor: '#3f51b5'
    },
    clockFace: {
      clockFaceBackgroundColor: '#f0f0f0',
      clockHandColor: '#3f51b5',
      clockFaceTimeInactiveColor: '#6c6c6c'
    }
  };
  displayedColumns: string[] = ['day', 'openHour', 'closeHour'];
  isLoaded: boolean;
  counter = 0;
  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  @Input() userId: string;
  @Input() clubId: number;
  @Input() isDisabled: boolean;
  @Input() dataSource: WorkingHours[] = [];

  @Output() workingHoursChange = new EventEmitter<WorkingHours[]>();

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(public dialog: MatDialog, private clubService: ClubService) {}

  ngOnInit() {
    if (this.clubId !== null) {
      this.clubService.getClub(this.clubId).subscribe(response => {
        this.setWorkingHours(response);
      });
    } else {
      this.days.forEach(d => {
        this.dataSource.push({
          id: this.counter++,
          day: d,
          openHour: undefined,
          closeHour: undefined
        });
      });
      this.isLoaded = true;
    }
  }

  setWorkingHours(response: any) {
    if (response !== null) {
      this.dataSource = [];
      response.workingHours.forEach(wh => {
        this.dataSource.push({
          id: wh.id,
          day: wh.day,
          openHour: wh.openHour,
          closeHour: wh.closeHour
        });
      });
    }
    this.table.renderRows();
    this.isLoaded = true;
  }
}
