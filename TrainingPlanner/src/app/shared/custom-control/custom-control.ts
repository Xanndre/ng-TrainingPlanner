import { FormGroup } from '@angular/forms';

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
}
