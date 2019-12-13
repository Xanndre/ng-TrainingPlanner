import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserFilterData } from 'src/app/models/FilterData/UserFilterData';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.css']
})
export class UserFiltersComponent {
  isClear = true;

  @Input() filterData: UserFilterData;

  @Output() getUsers = new EventEmitter<number>();

  constructor() {}

  clear() {
    this.filterData.keywords = undefined;
    this.isClear = true;
    this.getUsers.emit(1);
  }

  filter() {
    this.isClear = false;
    this.getUsers.emit(1);
  }
}
