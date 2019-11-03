import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ClubReviewDialogComponent } from 'src/app/shared/club-review-dialog/club-review-dialog.component';
import { ClubRate } from 'src/app/models/ClubStuff/ClubRate/ClubRate';

@Component({
  selector: 'app-club-review-list',
  templateUrl: './club-review-list.component.html',
  styleUrls: ['./club-review-list.component.css']
})
export class ClubReviewListComponent implements OnInit {
  reviews: ClubRate[] = [];
  counter = 0;
  userId: string;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  onScrollDown() {}

  openReviewDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ClubReviewDialogComponent, {
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

  addReview(rowObj: ClubRate) {
    this.reviews.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      clubId: 0,
      rate: rowObj.rate,
      description: rowObj.description,
      userId: this.userId
    });
  }

  editReview(rowObj: ClubRate) {
    this.reviews = this.reviews.filter(value => {
      if (value.id === rowObj.id) {
        value.rate = rowObj.rate;
        value.description = rowObj.description;
      }
      return true;
    });
  }

  deleteReview(rowObj: ClubRate) {
    this.reviews = this.reviews.filter(value => {
      return value.id !== rowObj.id;
    });
  }
}
