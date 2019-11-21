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
  }

  deleteTraining() {
    this.trainingService.deleteTraining(this.trainingId).subscribe(() => {
      const event = this.localData.events.find(c => c.id === this.trainingId);
      const index = this.localData.events.indexOf(event);
      this.localData.events.splice(index, 1);
      this.dialogRef.close({ event: 'Delete' });
    });
  }
}
