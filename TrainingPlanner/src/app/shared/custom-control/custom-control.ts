import { FormGroup } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

export class CustomControl {
  formGroup: FormGroup;
  controlType: string;
  type?: string;
  formControlName: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  min?: number;
  step?: number;
  label?: string;
  class?: string;
  values?: string[];
  multiple?: boolean;
  suffix?: string;
  theme?: NgxMaterialTimepickerTheme;
}
