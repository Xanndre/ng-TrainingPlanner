import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-club-review-dialog',
  templateUrl: './club-review-dialog.component.html',
  styleUrls: ['./club-review-dialog.component.css']
})
export class ClubReviewDialogComponent {
  action: string;
  localData: any;
  constructor(
    private dialogRef: MatDialogRef<ClubReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    this.localData = { ...data };
    this.action = this.localData.action;
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
