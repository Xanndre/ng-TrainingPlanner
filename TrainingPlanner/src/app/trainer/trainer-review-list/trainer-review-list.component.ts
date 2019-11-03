import { Component, OnInit } from '@angular/core';
import { TrainerRate } from 'src/app/models/TrainerStuff/TrainerRate/TrainerRate';
import { TrainerRateCreate } from 'src/app/models/TrainerStuff/TrainerRate/TrainerRateCreate';
import { MatDialog } from '@angular/material';
import { RateService } from 'src/app/services/Rate.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewDialogComponent } from 'src/app/shared/review-dialog/review-dialog.component';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-trainer-review-list',
  templateUrl: './trainer-review-list.component.html',
  styleUrls: ['./trainer-review-list.component.css']
})
export class TrainerReviewListComponent implements OnInit {
  reviews: TrainerRate[] = [];
  userId: string;
  trainerId: number;
  rate: TrainerRate;
  rateCreate: TrainerRateCreate;
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
    this.trainerId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    if (this.isUserAuthenticated) {
      this.rateService
        .getTrainerRate(this.userId, this.trainerId)
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
    this.rateService.updateTrainerRate(this.rate).subscribe(() => {});
  }

  deleteReview(rowObj: TrainerRate) {
    this.rateService.deleteTrainerRate(rowObj.id).subscribe(() => {
      window.location.reload();
    });
  }
}
