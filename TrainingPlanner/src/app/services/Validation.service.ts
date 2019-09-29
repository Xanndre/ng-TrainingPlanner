import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Please enter a valid value',
      minlength: `Minimum length: ${validatorValue.requiredLength} characters`,
      maxlength: `Maximum length: ${validatorValue.requiredLength} characters`,
      email: 'Please enter a valid value',
      hasNumber: 'Password must contain at least 1 digit',
      hasUpper: 'Password must contain at least 1 uppercase letter',
      hasLower: 'Password must contain at least 1 lowercase letter',
      hasSpecial: 'Password must contain at least 1 special character',
      pattern: 'Only letters allowed'
    };

    return config[validatorName];
  }
}
