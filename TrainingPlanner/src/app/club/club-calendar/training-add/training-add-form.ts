import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Training } from 'src/app/models/Training/Training';

export class TrainingAddForm {
  trainingForm: FormGroup;

  buildForm(
    formBuilder: FormBuilder,
    training: Training,
    startTime: string,
    endTime: string
  ) {
    this.trainingForm = formBuilder.group({
      title: [
        training !== null ? training.title : null,
        [Validators.required, Validators.maxLength(50)]
      ],
      entries: [
        training !== null ? training.entries : null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      trainer: [
        training !== null ? training.trainerName : null,
        [Validators.required]
      ],
      room: [
        training !== null ? training.room : null,
        [Validators.required, Validators.maxLength(30)]
      ],
      level: [training !== null ? training.level : null, [Validators.required]],
      date: [
        training !== null ? training.startDate : null,
        [Validators.required]
      ],
      startTime: [training !== null ? startTime : null, [Validators.required]],
      endTime: [training !== null ? endTime : null, [Validators.required]],
      primaryColor: [
        training !== null ? training.primaryColor : null,
        [Validators.required]
      ],
      secondaryColor: [
        training !== null ? training.secondaryColor : null,
        [Validators.required]
      ]
    });
  }
}
