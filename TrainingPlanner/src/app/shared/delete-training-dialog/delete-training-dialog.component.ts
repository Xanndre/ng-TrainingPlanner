import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TrainingService } from 'src/app/services/Training.service';

@Component({
  selector: 'app-delete-training-dialog',
  templateUrl: './delete-training-dialog.component.html',
  styleUrls: ['./delete-training-dialog.component.css']
})
export class DeleteTrainingDialogComponent implements OnInit {
  localData: any;
  trainingId: number;
  trainerId: number;

  constructor(
    private trainingService: TrainingService,
    private dialogRef: MatDialogRef<DeleteTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.localData = { ...data };
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    this.trainingId = this.localData.trainingId;
    this.trainerId = this.localData.trainerId;
  }

  deleteTraining() {
    this.trainingService.deleteTraining(this.trainingId).subscribe(() => {
      this.dialogRef.close({ event: 'Delete' });
      window.location.reload();
    });
  }
}
