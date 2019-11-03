import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TrainerRateBase } from 'src/app/models/TrainerStuff/TrainerRate/TrainerRateBase';

@Component({
  selector: 'app-trainer-review-list-item',
  templateUrl: './trainer-review-list-item.component.html',
  styleUrls: ['./trainer-review-list-item.component.css']
})
export class TrainerReviewListItemComponent {
  @Input() rate: TrainerRateBase;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
}
