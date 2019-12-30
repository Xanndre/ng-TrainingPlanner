import { Component, OnInit } from '@angular/core';
import { TrainerRate } from 'src/app/models/TrainerStuff/TrainerRate/TrainerRate';
import { TrainerRateCreate } from 'src/app/models/TrainerStuff/TrainerRate/TrainerRateCreate';
import { MatDialog } from '@angular/material';
import { RateService } from 'src/app/services/Rate.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewDialogComponent } from 'src/app/shared/review-dialog/review-dialog.component';
import { TrainerRateBase } from 'src/app/models/TrainerStuff/TrainerRate/TrainerRateBase';
import { RateFilterData } from 'src/app/models/FilterData/RateFilterData';

@Component({
  selector: 'app-trainer-review-list',
  templateUrl: './trainer-review-list.component.html',
  styleUrls: ['./trainer-review-list.component.css']
})
export class TrainerReviewListComponent implements OnInit {
  reviews: TrainerRateBase[] = [];
  userId: string;
  trainerId: number;
  rate: TrainerRate;
  rateCreate: TrainerRateCreate;
  isEdit = false;
  isLoaded: boolean;
  isUserAuthenticated: boolean;
  isRatesLoaded: boolean;

  pageSize = 3;
  totalPages: number;
  totalCount: number;
  currentPage: number;

  filterData: RateFilterData = {};
  sortData: string;

  constructor(
    private dialog: MatDialog,
    private rateService: RateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.trainerId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.rateService
      .getTrainerRate(this.userId, this.trainerId)
      .subscribe(response => {
        if (response) {
          this.isEdit = true;
        }
        this.rate = response;
        this.getTrainerRates(1, true);
        this.isLoaded = true;
      });
  }

  getTrainerRates(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.reviews = [];
    }
    this.rateService
      .getTrainerRates(
        pageNumber,
        this.pageSize,
        this.trainerId,
        this.filterData,
        this.sortData
      )
      .subscribe(response => {
        if (this.filterData.rate === null) {
          this.reviews = [];
        }
        this.reviews.push(...response.rates);
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.isRatesLoaded = true;
      });
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getTrainerRates(this.currentPage + 1);
    }
  }

  openReviewDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Add') {
          this.addReview(result.data);
        } else if (result.event === 'Edit') {
          this.editReview(result.data);
        } else if (result.event === 'Delete') {
          this.deleteReview(result.data);
        }
      }
    });
  }

  addReview(rowObj: TrainerRateCreate) {
    this.rateCreate = {
      userId: this.userId,
      trainerId: this.trainerId,
      rate: rowObj.rate,
      description: rowObj.description
    };
    this.rateService.createTrainerRate(this.rateCreate).subscribe(() => {
      window.location.reload();
    });
  }

  editReview(rowObj: TrainerRate) {
    this.rate.rate = rowObj.rate;
    this.rate.description = rowObj.description;
    this.rateService.updateTrainerRate(this.rate).subscribe(() => {
      window.location.reload();
    });
  }

  deleteReview(rowObj: TrainerRate) {
    this.rateService.deleteTrainerRate(rowObj.id).subscribe(() => {
      window.location.reload();
    });
  }
}
