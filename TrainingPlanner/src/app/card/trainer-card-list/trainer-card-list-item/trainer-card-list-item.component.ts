import { Component, OnInit, Input } from '@angular/core';
import { TrainerCardBase } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardBase';

@Component({
  selector: 'app-trainer-card-list-item',
  templateUrl: './trainer-card-list-item.component.html',
  styleUrls: ['./trainer-card-list-item.component.css']
})
export class TrainerCardListItemComponent implements OnInit {
  @Input() card: TrainerCardBase;

  constructor() {}

  ngOnInit() {}
}
