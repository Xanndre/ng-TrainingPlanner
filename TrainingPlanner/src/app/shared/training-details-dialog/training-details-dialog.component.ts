import { Component, OnInit, Inject } from '@angular/core';
import { TrainingService } from 'src/app/services/Training.service';
import { Training } from 'src/app/models/Training/Training';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-training-details-dialog',
  templateUrl: './training-details-dialog.component.html',
  styleUrls: ['./training-details-dialog.component.css']
})
export class TrainingDetailsDialogComponent implements OnInit {
  training: Training;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;

  constructor(
    private dialogRef: MatDialogRef<TrainingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.training = this.data.training;
    this.startDate = this.data.startDate;
    this.endDate = this.data.endDate;
    this.startTime = this.data.startTime;
    this.endTime = this.data.endTime;
  }

  signUp() {}
}
