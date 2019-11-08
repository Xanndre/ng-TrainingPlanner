import { Component, OnInit, Input } from '@angular/core';
import { ClubCardBase } from 'src/app/models/ClubStuff/ClubCard/ClubCardBase';

@Component({
  selector: 'app-club-card-list-item',
  templateUrl: './club-card-list-item.component.html',
  styleUrls: ['./club-card-list-item.component.css']
})
export class ClubCardListItemComponent implements OnInit {
  @Input() card: ClubCardBase;

  constructor() {}

  ngOnInit() {}
}
