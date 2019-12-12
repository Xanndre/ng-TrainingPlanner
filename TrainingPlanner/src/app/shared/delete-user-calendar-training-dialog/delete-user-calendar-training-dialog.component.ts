import { Component, OnInit, Inject } from '@angular/core';
import { UserCalendarTrainingService } from 'src/app/services/UserCalendarTraining.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-user-calendar-training-dialog',
  templateUrl: './delete-user-calendar-training-dialog.component.html',
  styleUrls: ['./delete-user-calendar-training-dialog.component.css']
})
export class DeleteUserCalendarTrainingDialogComponent implements OnInit {
  localData: any;
  trainingId: number;
  constructor(
    private userCalendarTrainingService: UserCalendarTrainingService,
    private dialogRef: MatDialogRef<DeleteUserCalendarTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.localData = { ...data };
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    this.trainingId = this.localData.trainingEvent.id;
  }

  deleteTraining() {
    this.userCalendarTrainingService
      .deleteUserCalendarTraining(this.trainingId)
      .subscribe(() => {
        const index = this.localData.events.indexOf(
          this.localData.trainingEvent
        );
        this.localData.events.splice(index, 1);
        this.dialogRef.close({ event: 'Delete' });
      });
  }
}
