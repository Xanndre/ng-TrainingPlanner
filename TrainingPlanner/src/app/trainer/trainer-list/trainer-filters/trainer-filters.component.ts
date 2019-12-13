import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TrainerFilterData } from 'src/app/models/FilterData/TrainerFilterData';
import { Sport } from 'src/app/models/Stuff/Sport';

@Component({
  selector: 'app-trainer-filters',
  templateUrl: './trainer-filters.component.html',
  styleUrls: ['./trainer-filters.component.css']
})
export class TrainerFiltersComponent {
  isClear = true;

  @Input() filterData: TrainerFilterData;
  @Input() locations: string[];
  @Input() sports: Sport[];

  @Output() getTrainers = new EventEmitter<number>();

  constructor() {}

  clear() {
    this.filterData.location = undefined;
    this.filterData.keywords = undefined;
    this.filterData.sportIds = undefined;
    this.isClear = true;
    this.getTrainers.emit(1);
  }

  filter() {
    this.isClear = false;
    this.getTrainers.emit(1);
  }
}
