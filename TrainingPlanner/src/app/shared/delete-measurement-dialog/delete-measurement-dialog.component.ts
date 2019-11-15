import { Component, OnInit, Inject } from '@angular/core';
import { BodyMeasurementService } from 'src/app/services/BodyMeasurement.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataTransferService } from 'src/app/services/DataTransfer.service';

@Component({
  selector: 'app-delete-measurement-dialog',
  templateUrl: './delete-measurement-dialog.component.html',
  styleUrls: ['./delete-measurement-dialog.component.css']
})
export class DeleteMeasurementDialogComponent implements OnInit {
  measurementId: number;

  constructor(
    private dataTransferService: DataTransferService,
    private bodyMeasurementService: BodyMeasurementService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteMeasurementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.measurementId = this.dataTransferService.getMeasurementId();
  }

  deleteMeasurement() {
    this.bodyMeasurementService
      .deleteBodyMeasurement(this.measurementId)
      .subscribe(() => {
        this.dialogRef.close();
        this.router.navigate(['/measurements']);
      });
  }
}
