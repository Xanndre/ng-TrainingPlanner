import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SortChoice } from 'src/app/models/FilterData/SortChoice';
import { RateFilterData } from 'src/app/models/FilterData/RateFilterData';

@Component({
  selector: 'app-club-review-filters',
  templateUrl: './club-review-filters.component.html',
  styleUrls: ['./club-review-filters.component.css']
})
export class ClubReviewFiltersComponent {
  rates: number[] = [1, 2, 3, 4, 5];

  sortChoice: SortChoice[] = [
    { value: 'rateDesc', viewValue: 'Highest to lowest' },
    { value: 'rateAsc', viewValue: 'Lowest to highest' }
  ];

  @Input() filterData: RateFilterData;
  @Input() sortData: string;

  @Output() sortDataChange = new EventEmitter<string>();
  @Output() getRates = new EventEmitter<number>();

  constructor() {}

  emitSortData() {
    this.sortDataChange.emit(this.sortData);
    this.getRates.emit(1);
  }

  emitRate() {
    this.getRates.emit(1);
  }
}
