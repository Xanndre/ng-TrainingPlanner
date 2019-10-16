import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trainer } from 'src/app/models/Trainer';
import { TrainerGet } from 'src/app/models/TrainerGet';

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
      sports: [trainer !== null ? sportNames : null, Validators.required]
    });
  }
}
