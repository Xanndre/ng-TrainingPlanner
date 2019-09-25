import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';

export class UserForm {
  userForm: FormGroup;

  buildForm(formBuilder: FormBuilder, user: User) {
    this.userForm = formBuilder.group({
      firstName: [
        user.firstName,
        [Validators.required, Validators.pattern('[a-zA-Z]*')]
      ],
      lastName: [
        user.lastName,
        [Validators.required, Validators.pattern('[a-zA-Z]*')]
      ],
      email: [user.email, [Validators.required, Validators.email]],
      city: [user.city, Validators.pattern('[a-zA-Z]*')]
    });
  }
}
