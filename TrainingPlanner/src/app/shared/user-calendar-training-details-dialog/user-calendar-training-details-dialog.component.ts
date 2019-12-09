import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserCalendarTraining } from 'src/app/models/UserStuff/UserCalendarTraining/UserCalendarTraining';

@Component({
  selector: 'app-user-calendar-training-details-dialog',
  templateUrl: './user-calendar-training-details-dialog.component.html',
  styleUrls: ['./user-calendar-training-details-dialog.component.css']
})
export class UserCalendarTrainingDetailsDialogComponent implements OnInit {
  training: UserCalendarTraining;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  userId: string;

  constructor(
    private dialogRef: MatDialogRef<UserCalendarTrainingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.training = this.data.training;
    this.startDate = this.data.startDate;
    this.endDate = this.data.endDate;
    this.startTime = this.data.startTime;
    this.endTime = this.data.endTime;
  }
}
