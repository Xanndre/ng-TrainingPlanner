import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserCalendarTraining } from 'src/app/models/UserStuff/UserCalendarTraining/UserCalendarTraining';

export class UserCalendarTrainingAddForm {
  trainingForm: FormGroup;

  buildForm(
    formBuilder: FormBuilder,
    training: UserCalendarTraining,
    startTime: string,
    endTime: string
  ) {
    this.trainingForm = formBuilder.group({
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
