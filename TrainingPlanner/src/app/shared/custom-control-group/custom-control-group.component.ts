import { Component, Input } from '@angular/core';
import { CustomControlGroup } from './custom-control-group';

@Component({
  selector: 'app-custom-control-group',
  templateUrl: './custom-control-group.component.html',
  styleUrls: ['./custom-control-group.component.css']
})
export class CustomControlGroupComponent {
  @Input() customControlGroup: CustomControlGroup;
  @Input() readonly: boolean;

  constructor() {}
}
