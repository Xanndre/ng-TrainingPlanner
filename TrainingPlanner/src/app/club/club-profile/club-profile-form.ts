import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClubGet } from 'src/app/models/ClubGet';

export class ClubProfileForm {
  clubForm: FormGroup;

  buildForm(formBuilder: FormBuilder, club: ClubGet) {
    this.clubForm = formBuilder.group({
      name: [club !== null ? club.name : null, Validators.required],
      description: [
        club !== null ? club.description : null,
        Validators.required
      ],
      streetName: [club !== null ? club.streetName : null, Validators.required],
      streetNumber: [
        club !== null ? club.streetNumber : null,
        Validators.required
      ],
      postalCode: [club !== null ? club.postalCode : null, Validators.required],
      city: [club !== null ? club.city : null, Validators.required],
      phoneNumber: [club !== null ? club.phoneNumber : null],
      email: [
        club !== null ? club.email : null,
        [Validators.required, Validators.email]
      ]
    });
  }
}
