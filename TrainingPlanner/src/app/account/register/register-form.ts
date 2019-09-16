import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  hasNumber,
  hasUpper,
  hasLower,
  hasSpecial
} from 'src/app/validators/PasswordValidator';

export class RegisterForm {
  registerForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      firstName: [null, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          hasNumber,
          hasUpper,
          hasLower,
          hasSpecial
        ]
      ]
    });
  }
}
