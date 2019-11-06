import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  hasNumber,
  hasUpper,
  hasLower,
  hasSpecial,
  isMatching
} from 'src/app/validators/PasswordValidator';

export class ChangePasswordDialogForm {
  passwordForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group(
      {
        email: [
          null,
          [Validators.required, Validators.maxLength(40), Validators.email]
        ],
        oldPassword: [null, [Validators.required, Validators.maxLength(20)]],
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
