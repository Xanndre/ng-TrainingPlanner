import { Component, Input } from '@angular/core';
import { CustomControl } from './custom-control';

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.css']
})
export class CustomControlComponent {
  @Input() customControl: CustomControl;
  @Input() readonly: boolean;

  constructor() {}
}
