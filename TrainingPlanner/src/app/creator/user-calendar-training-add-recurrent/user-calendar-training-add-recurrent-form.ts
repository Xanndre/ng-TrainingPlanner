import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class UserCalendarTrainingAddRecurrentForm {
  trainingForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.trainingForm = formBuilder.group({
      day: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      primaryColor: [null, [Validators.required]],
      secondaryColor: [null, [Validators.required]]
    });
  }
}
