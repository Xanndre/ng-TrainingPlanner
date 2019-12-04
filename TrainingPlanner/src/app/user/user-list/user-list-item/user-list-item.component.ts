import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/models/Reservation/Reservation';
import { ReservationService } from 'src/app/services/Reservation.service';
import { Training } from 'src/app/models/Training/Training';
import { TrainingService } from 'src/app/services/Training.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;
  @Input() isSignList: boolean;
  @Input() trainingId: number;
  @Input() isSignedUp: boolean;

  clubId: number;
  trainerId: number;
  training: Training;
  isReserveList: boolean;
  isInfoLoaded: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.clubId = parseInt(this.route.snapshot.paramMap.get('clubId'), 10);
    this.trainerId = parseInt(
      this.route.snapshot.paramMap.get('trainerId'),
      10
    );
    if (this.isSignList) {
      this.trainingService.getTraining(this.trainingId).subscribe(response => {
        this.training = response;
        this.getReservationInfo();
      });
    } else {
      this.isInfoLoaded = true;
    }
  }

  manageCards() {
    if (!Number.isNaN(this.clubId)) {
      this.router.navigate([
        `/users/${this.user.id}/club_cards/clubs/${this.clubId}`
      ]);
    } else {
      this.router.navigate([
        `/users/${this.user.id}/trainer_cards/trainers/${this.trainerId}`
      ]);
    }
  }

  signUp() {
    const reservation: Reservation = new Reservation();
    reservation.userId = this.user.id;
    reservation.trainingId = this.trainingId;
    this.reservationService.createReservation(reservation).subscribe(() => {
      window.location.reload();
    });
  }

  signOut() {
    this.reservationService
      .deleteReservation(this.trainingId, this.user.id)
      .subscribe(() => {
        window.location.reload();
      });
  }

  getReservationInfo() {
    this.reservationService
      .getReservationInfo(this.user.id, this.trainingId)
      .subscribe(response => {
        this.isReserveList = response.isReserveList;
        this.isInfoLoaded = true;
      });
  }
}
