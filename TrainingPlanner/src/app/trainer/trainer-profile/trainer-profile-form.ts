import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trainer } from 'src/app/models/Trainer/Trainer';
import { isPhoneNumber } from 'src/app/validators/PatternValidator';

export class TrainerProfileForm {
  trainerForm: FormGroup;

  buildForm(formBuilder: FormBuilder, trainer: Trainer) {
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
