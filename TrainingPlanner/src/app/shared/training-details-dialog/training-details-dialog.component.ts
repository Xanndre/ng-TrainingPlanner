import { Component, OnInit, Inject } from '@angular/core';
import { Training } from 'src/app/models/Training/Training';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReservationService } from 'src/app/services/Reservation.service';
import { Reservation } from 'src/app/models/Reservation/Reservation';

@Component({
  selector: 'app-training-details-dialog',
  templateUrl: './training-details-dialog.component.html',
  styleUrls: ['./training-details-dialog.component.css']
})
export class TrainingDetailsDialogComponent implements OnInit {
  training: Training;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  userId: string;

  isMine: boolean;
  isSignedUp: boolean;
  isReserveList: boolean;

  isInfoLoaded: boolean;

  constructor(
    private reservationService: ReservationService,
    private dialogRef: MatDialogRef<TrainingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.training = this.data.training;
    this.startDate = this.data.startDate;
    this.endDate = this.data.endDate;
    this.startTime = this.data.startTime;
    this.endTime = this.data.endTime;

    if (this.training.clubId !== null) {
      this.isMine = this.training.club.user.id === this.userId ? true : false;
    } else {
      this.isMine =
        this.training.trainer.user.id === this.userId ? true : false;
    }
    this.getReservationInfo();
  }

  signUp() {
    const reservation: Reservation = new Reservation();
    reservation.userId = this.userId;
    reservation.trainingId = this.training.id;
    this.reservationService.createReservation(reservation).subscribe(() => {
      this.closeDialog();
    });
  }

  signOut() {
    this.reservationService
      .deleteReservation(this.training.id, this.userId)
      .subscribe(() => {
        if (this.data.isUserCalendar) {
          const index = this.data.events.indexOf(this.data.trainingEvent);
          this.data.events.splice(index, 1);
        }
        this.dialogRef.close({ event: 'Delete' });
      });
  }

  getReservationInfo() {
    this.reservationService
      .getReservationInfo(this.userId, this.training.id)
      .subscribe(response => {
        this.isSignedUp = response.isSignedUp;
        this.isReserveList = response.isReserveList;
        this.isInfoLoaded = true;
      });
  }

  isPossible() {
    const now = new Date();
    const end = new Date(this.training.endDate);
    if (end < now) {
      return false;
    } else {
      return true;
    }
  }
}
