import { Component, OnInit, Input } from '@angular/core';
import { Partner } from 'src/app/models/User/Partner';

@Component({
  selector: 'app-partner-list-item',
  templateUrl: './partner-list-item.component.html',
  styleUrls: ['./partner-list-item.component.css']
})
export class PartnerListItemComponent implements OnInit {
  @Input() partner: Partner;

  constructor() {}

  ngOnInit() {}
}
