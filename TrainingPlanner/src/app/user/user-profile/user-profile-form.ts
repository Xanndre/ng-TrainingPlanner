import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

export class UserProfileForm {
  userForm: FormGroup;

  buildForm(formBuilder: FormBuilder, user: User) {
    this.userForm = formBuilder.group({
      firstName: [
        user.firstName,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
        ]
      ],
      lastName: [
        user.lastName,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
        ]
      ],
      email: [
        user.email,
        [Validators.required, Validators.maxLength(40), Validators.email]
      ],
      city: [
        user.city,
        [
          Validators.maxLength(25),
          Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\\s]*')
        ]
      ],
      birthDate: [user.birthDate, [Validators.required]],
      gender: [user.gender, Validators.required]
    });
  }
}
