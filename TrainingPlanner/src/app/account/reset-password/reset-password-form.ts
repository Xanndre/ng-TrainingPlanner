import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  hasNumber,
  hasUpper,
  hasLower,
  hasSpecial,
  isMatching
} from 'src/app/validators/PasswordValidator';

export class ResetPasswordForm {
  passwordForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group(
      {
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            hasNumber,
            hasUpper,
            hasLower,
            hasSpecial
          ]
        ],
        confirmPassword: [null, [Validators.required]]
      },
      { validator: isMatching }
    );
  }
}
