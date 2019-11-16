import { Component, OnInit } from '@angular/core';
import { BodyMeasurementBase } from 'src/app/models/BodyMeasurement/BodyMeasurementBase';
import { BodyMeasurementService } from 'src/app/services/BodyMeasurement.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  measurements: BodyMeasurementBase[] = [];

  isEdit = false;
  isLoaded = false;

  totalPages: number;
  totalCount: number;
  pageSize = 5;
  currentPage: number;

  userId: string;

  constructor(
    private route: ActivatedRoute,
    private bodyMeasurementService: BodyMeasurementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.isEdit = this.route.snapshot.data.edit;
    this.getMeasurements(1, true);
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getMeasurements(this.currentPage + 1);
    }
  }

  getMeasurements(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.measurements = [];
    }
    this.bodyMeasurementService
      .getBodyMeasurements(pageNumber, this.pageSize, this.userId)
      .subscribe(response => {
        this.measurements.push(...response.bodyMeasurements);
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.isLoaded = true;
      });
  }

  addMeasurement() {
    this.router.navigate(['/measurements/add']);
  }
}
