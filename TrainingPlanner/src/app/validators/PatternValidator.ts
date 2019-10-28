import { AbstractControl } from '@angular/forms';

export function isPhoneNumber(control: AbstractControl) {
  if (
    !/[0-9]{3}-[0-9]{3}-[0-9]{3}/.test(control.value) ||
    control.value.length !== 11
  ) {
    return { isPhoneNumber: true };
  }
}
