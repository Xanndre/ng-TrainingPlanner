import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class TrainingAddRecurrentForm {
  trainingForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.trainingForm = formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      entries: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      room: [null, [Validators.required, Validators.maxLength(30)]],
      level: [null, [Validators.required]],
      day: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      primaryColor: [null, [Validators.required]],
      secondaryColor: [null, [Validators.required]]
    });
  }
}
