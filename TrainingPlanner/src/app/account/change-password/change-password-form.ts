import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  hasNumber,
  isMatching,
  hasUpper,
  hasLower,
  hasSpecial
} from 'src/app/validators/PasswordValidator';

export class ChangePasswordForm {
  passwordForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group(
      {
        email: [
          null,
          [Validators.required, Validators.maxLength(40), Validators.email]
        ],
        currentPassword: [
          null,
          [Validators.required, Validators.maxLength(20)]
        ],
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
