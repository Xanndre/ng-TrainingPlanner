import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class TrainerAddForm {
  trainerForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.trainerForm = formBuilder.group({
      description: [null, Validators.required],
      sports: [null, Validators.required]
    });
  }
}
