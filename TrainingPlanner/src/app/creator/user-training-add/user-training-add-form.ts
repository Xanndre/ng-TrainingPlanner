import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserTraining } from 'src/app/models/UserStuff/UserTraining/UserTraining';

export class UserTrainingAddForm {
  trainingForm: FormGroup;

  buildForm(formBuilder: FormBuilder, training: UserTraining) {
    this.trainingForm = formBuilder.group({
      title: [
        training !== null ? training.name : null,
        [Validators.required, Validators.maxLength(50)]
      ],
      type: [training !== null ? training.type : null, Validators.required]
    });
  }
}
