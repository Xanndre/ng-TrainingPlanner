import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/services/Validation.service';

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.css']
})
export class CustomErrorComponent {
  @Input() customControl: FormControl;
  constructor() {}

  get errorMessage() {
    for (const propertyName in this.customControl.errors) {
      if (
        this.customControl.errors.hasOwnProperty(propertyName) &&
        (this.customControl.touched || this.customControl.dirty)
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.customControl.errors[propertyName]
        );
      }
    }
    return null;
  }
}
