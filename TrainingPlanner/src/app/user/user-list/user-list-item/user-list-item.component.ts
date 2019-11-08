import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;

  clubId: number;
  trainerId: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
}
