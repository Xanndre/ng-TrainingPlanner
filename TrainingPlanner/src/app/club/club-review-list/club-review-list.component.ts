import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ClubRate } from 'src/app/models/ClubStuff/ClubRate/ClubRate';
import { RateService } from 'src/app/services/Rate.service';
import { ActivatedRoute } from '@angular/router';
import { ClubRateCreate } from 'src/app/models/ClubStuff/ClubRate/ClubRateCreate';
import { ReviewDialogComponent } from 'src/app/shared/review-dialog/review-dialog.component';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-club-review-list',
  templateUrl: './club-review-list.component.html',
  styleUrls: ['./club-review-list.component.css']
})
export class ClubReviewListComponent implements OnInit {
  reviews: ClubRate[] = [];
  userId: string;
  clubId: number;
  rate: ClubRate;
  rateCreate: ClubRateCreate;
  isEdit = false;
  isLoaded: boolean;
  isUserAuthenticated: boolean;

  constructor(
    private dialog: MatDialog,
    private rateService: RateService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.clubId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    if (this.isUserAuthenticated) {
      this.rateService
        .getClubRate(this.userId, this.clubId)
        .subscribe(response => {
          if (response) {
            this.isEdit = true;
          }
          this.rate = response;
          this.isLoaded = true;
        });
    } else {
      this.isLoaded = true;
    }
  }

  onScrollDown() {}

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
    this.rateService.updateClubRate(this.rate).subscribe(() => {});
  }

  deleteReview(rowObj: ClubRate) {
    this.rateService.deleteClubRate(rowObj.id).subscribe(() => {
      window.location.reload();
    });
  }
}
