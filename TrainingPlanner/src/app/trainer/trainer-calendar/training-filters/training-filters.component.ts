import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TrainingFilterData } from 'src/app/models/FilterData/TrainingFilterData';

@Component({
  selector: 'app-training-filters',
  templateUrl: './training-filters.component.html',
  styleUrls: ['./training-filters.component.css']
})
export class TrainingFiltersComponent {
  isClear = true;

  @Input() filterData: TrainingFilterData;
  @Input() levels: string[];
  @Input() names: string[];
  @Input() hours: string[];

  @Output() getTrainings = new EventEmitter<number>();

  constructor() {}

  clear() {
    this.filterData.level = undefined;
    this.filterData.title = undefined;
    this.filterData.dateLowerBound = undefined;
    this.filterData.dateUpperBound = undefined;
    this.isClear = true;
    this.getTrainings.emit(1);
  }

  filter() {
    this.isClear = false;
    this.getTrainings.emit(1);
  }
}
