import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ClubRate } from 'src/app/models/ClubStuff/ClubRate/ClubRate';
import { RateService } from 'src/app/services/Rate.service';
import { ActivatedRoute } from '@angular/router';
import { ClubRateCreate } from 'src/app/models/ClubStuff/ClubRate/ClubRateCreate';
import { ReviewDialogComponent } from 'src/app/shared/review-dialog/review-dialog.component';
import { ClubRateBase } from 'src/app/models/ClubStuff/ClubRate/ClubRateBase';
import { RateFilterData } from 'src/app/models/FilterData/RateFilterData';

@Component({
  selector: 'app-club-review-list',
  templateUrl: './club-review-list.component.html',
  styleUrls: ['./club-review-list.component.css']
})
export class ClubReviewListComponent implements OnInit {
  reviews: ClubRateBase[] = [];
  userId: string;
  clubId: number;
  rate: ClubRate;
  rateCreate: ClubRateCreate;
  isEdit = false;
  isLoaded: boolean;
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
    this.clubId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.rateService
      .getClubRate(this.userId, this.clubId)
      .subscribe(response => {
        if (response) {
          this.isEdit = true;
        }
        this.rate = response;
        this.getClubRates(1, true);
        this.isLoaded = true;
      });
  }

  getClubRates(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.reviews = [];
    }

    this.rateService
      .getClubRates(
        pageNumber,
        this.pageSize,
        this.clubId,
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
      this.getClubRates(this.currentPage + 1);
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

  addReview(rowObj: ClubRateCreate) {
    this.rateCreate = {
      userId: this.userId,
      clubId: this.clubId,
      rate: rowObj.rate,
      description: rowObj.description
    };
    this.rateService.createClubRate(this.rateCreate).subscribe(() => {
      window.location.reload();
    });
  }

  editReview(rowObj: ClubRate) {
    this.rate.rate = rowObj.rate;
    this.rate.description = rowObj.description;
    this.rateService.updateClubRate(this.rate).subscribe(() => {
      window.location.reload();
    });
  }

  deleteReview(rowObj: ClubRate) {
    this.rateService.deleteClubRate(rowObj.id).subscribe(() => {
      window.location.reload();
    });
  }
}
