import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BodyMeasurement } from 'src/app/models/BodyMeasurement/BodyMeasurement';

@Component({
  selector: 'app-measurement-details',
  templateUrl: './measurement-details.component.html',
  styleUrls: ['./measurement-details.component.css']
})
export class MeasurementDetailsComponent implements OnInit {
  measurement: BodyMeasurement;
  injuries = '';
  isLoaded: boolean;
  date: string;

  constructor(
    private dialogRef: MatDialogRef<MeasurementDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.measurement = this.data.measurement;
    this.measurement.injuries.forEach(j => {
      if (
        j === this.measurement.injuries[this.measurement.injuries.length - 1]
      ) {
        this.injuries += j.injury;
      } else {
        this.injuries += j.injury + ', ';
      }
    });
    this.date = new Date(this.measurement.date).toLocaleDateString();
    this.isLoaded = true;
  }
}
