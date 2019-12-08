import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserTraining } from 'src/app/models/UserStuff/UserTraining/UserTraining';

export class UserTrainingAddForm {
  trainingForm: FormGroup;

  buildForm(formBuilder: FormBuilder, training: UserTraining) {
    this.trainingForm = formBuilder.group({
      title: [
        training !== undefined ? training.name : null,
        [Validators.required, Validators.maxLength(50)]
      ],
      type: [training !== undefined ? training.type : null, Validators.required]
    });
  }
}
