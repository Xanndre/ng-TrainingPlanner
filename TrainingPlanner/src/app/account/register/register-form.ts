import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  hasNumber,
  hasUpper,
  hasLower,
  hasSpecial,
  isMatching
} from 'src/app/validators/PasswordValidator';

export class RegisterForm {
  registerForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group(
      {
        firstName: [
          null,
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
          ]
        ],
        lastName: [
          null,
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
          ]
        ],
        email: [
          null,
          [Validators.maxLength(40), Validators.required, Validators.email]
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
        confirmPassword: [null, [Validators.required]],
        city: [
          null,
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\\s]*')
          ]
        ],
        birthDate: [null, [Validators.required]],
        gender: [null, Validators.required]
      },
      { validator: isMatching }
    );
  }
}
