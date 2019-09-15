import { AbstractControl } from '@angular/forms';

export function hasNumber(control: AbstractControl) {
  if (!/\d/.test(control.value)) {
    return { hasNumber: true };
  }
  return null;
}

export function hasUpper(control: AbstractControl) {
  if (!/[A-Z]/.test(control.value)) {
    return { hasUpper: true };
  }
  return null;
}

export function hasLower(control: AbstractControl) {
  if (!/[a-z]/.test(control.value)) {
    return { hasLower: true };
  }
  return null;
}

export function hasSpecial(control: AbstractControl) {
  if (!/[@$!%*#?&]/.test(control.value)) {
    return { hasSpecial: true };
  }
  return null;
}
