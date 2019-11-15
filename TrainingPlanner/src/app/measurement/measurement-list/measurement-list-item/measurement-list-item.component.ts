import { Component, OnInit, Input } from '@angular/core';
import { BodyMeasurementBase } from 'src/app/models/BodyMeasurement/BodyMeasurementBase';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement-list-item',
  templateUrl: './measurement-list-item.component.html',
  styleUrls: ['./measurement-list-item.component.css']
})
export class MeasurementListItemComponent implements OnInit {
  @Input() measurement: BodyMeasurementBase;

  date: string;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.date = new Date(this.measurement.date).toLocaleDateString();
  }

  editMeasurement() {
    this.router.navigate(['/measurements/edit']);
  }

  deleteMeasurement() {
    // tutaj dialog z usuwaniem
  }

  viewDetails() {
    // tutaj dialog ze szczegółami
  }
}
