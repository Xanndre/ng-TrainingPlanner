import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-training-dialog',
  templateUrl: './training-dialog.component.html',
  styleUrls: ['./training-dialog.component.css']
})
export class TrainingDialogComponent {
  action: string;
  localData: any;
  constructor(
    private dialogRef: MatDialogRef<TrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.localData = { ...data };
    this.action = this.localData.action;
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
