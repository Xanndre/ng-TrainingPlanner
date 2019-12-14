import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardFilterData } from 'src/app/models/FilterData/CardFilterData';

@Component({
  selector: 'app-card-filters',
  templateUrl: './card-filters.component.html',
  styleUrls: ['./card-filters.component.css']
})
export class CardFiltersComponent {
  isClear = true;

  @Input() filterData: CardFilterData;
  @Input() cardNames: string[];
  @Input() isUser: boolean;

  @Output() getCards = new EventEmitter<number>();

  constructor() {}

  clear() {
    this.filterData.keywords = undefined;
    this.filterData.isActive = undefined;
    this.filterData.name = undefined;
    this.isClear = true;
    this.getCards.emit(1);
  }

  filter() {
    this.isClear = false;
    this.getCards.emit(1);
  }
}
