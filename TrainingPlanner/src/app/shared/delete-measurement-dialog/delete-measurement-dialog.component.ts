import { Component, OnInit, Inject } from '@angular/core';
import { BodyMeasurementService } from 'src/app/services/BodyMeasurement.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-measurement-dialog',
  templateUrl: './delete-measurement-dialog.component.html',
  styleUrls: ['./delete-measurement-dialog.component.css']
})
export class DeleteMeasurementDialogComponent implements OnInit {
  measurementId: number;

  constructor(
    private bodyMeasurementService: BodyMeasurementService,
    private dialogRef: MatDialogRef<DeleteMeasurementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.measurementId = this.data.measurementId;
  }

  deleteMeasurement() {
    this.bodyMeasurementService
      .deleteBodyMeasurement(this.measurementId)
      .subscribe(() => {
        this.dialogRef.close();
        window.location.reload();
      });
  }
}
