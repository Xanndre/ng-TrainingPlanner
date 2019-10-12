import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trainer } from 'src/app/models/Trainer';

export class TrainerAddForm {
  trainerForm: FormGroup;

  buildForm(formBuilder: FormBuilder, trainer: Trainer) {
    const sportNames = [];
    trainer.sports.forEach(s => {
      sportNames.push(s.sportName);
    });

    this.trainerForm = formBuilder.group({
      description: [
        trainer !== null ? trainer.description : null,
        Validators.required
      ],
      sports: [trainer !== null ? sportNames : null, Validators.required]
    });
  }
}
