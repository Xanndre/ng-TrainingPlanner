import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'This field is required',
      minlength: `Minimum length: ${validatorValue.requiredLength} characters`,
      email: 'Valid email adress is required',
      hasNumber: 'Password must contain at least 1 digit',
      hasUpper: 'Password must contain at least 1 uppercase letter',
      hasLower: 'Password must contain at least 1 lowercase letter',
      hasSpecial: 'Password must contain at least 1 special character',
      pattern: 'Valid pattern is required'
    };

    return config[validatorName];
  }
}
