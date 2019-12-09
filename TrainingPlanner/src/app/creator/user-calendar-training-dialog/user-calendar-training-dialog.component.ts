import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-calendar-training-dialog',
  templateUrl: './user-calendar-training-dialog.component.html',
  styleUrls: ['./user-calendar-training-dialog.component.css']
})
export class UserCalendarTrainingDialogComponent implements OnInit {
  trainingId: number;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<UserCalendarTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.trainingId = this.data.trainingId;
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  goToSingleTraining() {
    this.router.navigate([`/training_creator/${this.trainingId}/add`]);
    this.closeDialog();
  }

  goToRecurrentTraining() {
    this.router.navigate([
      `/training_creator/${this.trainingId}/add_recurrent`
    ]);
    this.closeDialog();
  }
}
