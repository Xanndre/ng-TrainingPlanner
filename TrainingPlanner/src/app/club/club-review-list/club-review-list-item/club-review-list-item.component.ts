import { Component, Input } from '@angular/core';
import { ClubRateBase } from 'src/app/models/ClubStuff/ClubRate/ClubRateBase';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-club-review-list-item',
  templateUrl: './club-review-list-item.component.html',
  styleUrls: ['./club-review-list-item.component.css']
})
export class ClubReviewListItemComponent {
  @Input() rate: ClubRateBase;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
}
