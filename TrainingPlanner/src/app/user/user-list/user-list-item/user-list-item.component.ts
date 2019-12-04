import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/models/Reservation/Reservation';
import { ReservationService } from 'src/app/services/Reservation.service';
import { Training } from 'src/app/models/Training/Training';
import { TrainingService } from 'src/app/services/Training.service';
import { ReservationInfo } from 'src/app/models/Reservation/ReservationInfo';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;
  @Input() isSignList: boolean;
  @Input() isSignedUp: boolean;
  @Input() training?: Training;
  @Input() reservationInfo?: ReservationInfo;

  clubId: number;
  trainerId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.clubId = parseInt(this.route.snapshot.paramMap.get('clubId'), 10);
    this.trainerId = parseInt(
      this.route.snapshot.paramMap.get('trainerId'),
      10
    );
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
    reservation.trainingId = this.training.id;
    this.reservationService.createReservation(reservation).subscribe(() => {
      window.location.reload();
    });
  }

  signOut() {
    this.reservationService
      .deleteReservation(this.training.id, this.user.id)
      .subscribe(() => {
        window.location.reload();
      });
  }
}
