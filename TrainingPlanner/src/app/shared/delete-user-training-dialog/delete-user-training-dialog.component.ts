import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserTrainingService } from 'src/app/services/UserTraining.service';

@Component({
  selector: 'app-delete-user-training-dialog',
  templateUrl: './delete-user-training-dialog.component.html',
  styleUrls: ['./delete-user-training-dialog.component.css']
})
export class DeleteUserTrainingDialogComponent implements OnInit {
  trainingId: number;

  constructor(
    private userTrainingService: UserTrainingService,
    private dialogRef: MatDialogRef<DeleteUserTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.trainingId = this.data.trainingId;
  }

  deleteTraining() {
    this.userTrainingService
      .deleteUserTraining(this.trainingId)
      .subscribe(() => {
        this.dialogRef.close();
        window.location.reload();
      });
  }
}
