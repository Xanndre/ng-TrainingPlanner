import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClubFilterData } from 'src/app/models/FilterData/ClubFilterData';

@Component({
  selector: 'app-club-filters',
  templateUrl: './club-filters.component.html',
  styleUrls: ['./club-filters.component.css']
})
export class ClubFiltersComponent {
  isClear = true;

  @Input() filterData: ClubFilterData;
  @Input() locations: string[];

  @Output() getClubs = new EventEmitter<number>();

  constructor() {}

  clear() {
    this.filterData.location = undefined;
    this.filterData.keywords = undefined;
    this.isClear = true;
    this.getClubs.emit(1);
  }

  filter() {
    this.isClear = false;
    this.getClubs.emit(1);
  }
}
