import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainerGet } from 'src/app/models/TrainerGet';
import { isPhoneNumber } from 'src/app/validators/PatternValidator';

export class TrainerProfileForm {
  trainerForm: FormGroup;

  buildForm(formBuilder: FormBuilder, trainer: TrainerGet) {
    const sportNames = [];
    if (trainer !== null) {
      trainer.sports.forEach(s => {
        sportNames.push(s.sport.name);
      });
    }

    this.trainerForm = formBuilder.group({
      description: [
        trainer !== null ? trainer.description : null,
        Validators.required
      ],
      phoneNumber: [
        trainer !== null ? trainer.phoneNumber : null,
        isPhoneNumber
      ],
      sports: [trainer !== null ? sportNames : null, Validators.required]
    });
  }
}
