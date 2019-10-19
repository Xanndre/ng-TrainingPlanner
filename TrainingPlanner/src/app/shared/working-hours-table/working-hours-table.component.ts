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
import { WorkingHoursDialogComponent } from './working-hours-dialog/working-hours-dialog.component';

@Component({
  selector: 'app-working-hours-table',
  templateUrl: './working-hours-table.component.html',
  styleUrls: ['./working-hours-table.component.css']
})
export class WorkingHoursTableComponent implements OnInit {
  displayedColumns: string[] = ['day', 'openHour', 'closeHour', 'action'];
  @Input() dataSource: WorkingHours[] = [];
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

  @Output() workingHoursChange = new EventEmitter<WorkingHours[]>();

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(public dialog: MatDialog, private clubService: ClubService) {}

  ngOnInit() {
    if (this.clubId !== undefined) {
      this.clubService.getClub(this.clubId).subscribe(response => {
        this.setWorkingHours(response);
      });
    } else {
      this.days.forEach(d => {
        this.dataSource.push({
          id: this.counter++,
          day: d,
          openHour: new Date(),
          closeHour: new Date()
        });
      });
    }
  }

  setWorkingHours(response: any) {
    if (response !== null) {
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
    console.log('Dupa');
    this.isLoaded = true;
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(WorkingHoursDialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Edit') {
          this.updateRowData(result.data);
        }
      }
    });
  }

  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter(value => {
      if (value.id === rowObj.id) {
        value.openHour = rowObj.openHour;
        value.closeHour = rowObj.closeHour;
      }
      return true;
    });
    this.workingHoursChange.emit(this.dataSource);
  }
}
