import { Component, OnInit, Input } from '@angular/core';
import { BodyMeasurementBase } from 'src/app/models/BodyMeasurement/BodyMeasurementBase';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DeleteMeasurementDialogComponent } from 'src/app/shared/delete-measurement-dialog/delete-measurement-dialog.component';
import { DataTransferService } from 'src/app/services/DataTransfer.service';
import { MeasurementDetailsComponent } from '../../measurement-details/measurement-details.component';

@Component({
  selector: 'app-measurement-list-item',
  templateUrl: './measurement-list-item.component.html',
  styleUrls: ['./measurement-list-item.component.css']
})
export class MeasurementListItemComponent implements OnInit {
  @Input() measurement: BodyMeasurementBase;

  date: string;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit() {
    this.date = new Date(this.measurement.date).toLocaleDateString();
  }

  editMeasurement() {
    this.router.navigate([`/measurements/edit/${this.measurement.id}`]);
  }

  deleteMeasurement() {
    this.dataTransferService.setMeasurementId(this.measurement.id);
    this.openDeleteDialog(
      'Do you really want to delete this measurement? This process cannot be undone.'
    );
  }

  openDeleteDialog(error: string): void {
    this.dialog.open(DeleteMeasurementDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  viewDetails() {
    this.dialog.open(MeasurementDetailsComponent, {
      data: { id: this.measurement.id },
      width: '470px'
    });
  }
}
