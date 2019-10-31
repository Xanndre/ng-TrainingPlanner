import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Club } from 'src/app/models/Club/Club';
import {
  isPhoneNumber,
  isPostalCode
} from 'src/app/validators/PatternValidator';

export class ClubProfileForm {
  clubForm: FormGroup;

  buildForm(formBuilder: FormBuilder, club: Club) {
    this.clubForm = formBuilder.group({
      name: [
        club !== null ? club.name : null,
        [Validators.required, Validators.maxLength(50)]
      ],
      description: [
        club !== null ? club.description : null,
        Validators.required
      ],
      streetName: [
        club !== null ? club.streetName : null,
        [Validators.required, Validators.maxLength(25)]
      ],
      streetNumber: [
        club !== null ? club.streetNumber : null,
        [Validators.required, Validators.maxLength(10)]
      ],
      postalCode: [
        club !== null ? club.postalCode : null,
        [Validators.required, isPostalCode]
      ],
      city: [
        club !== null ? club.city : null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\\s]*')
        ]
      ],
      phoneNumber: [club !== null ? club.phoneNumber : null, isPhoneNumber],
      email: [
        club !== null ? club.email : null,
        [Validators.required, Validators.email]
      ]
    });
  }
}
