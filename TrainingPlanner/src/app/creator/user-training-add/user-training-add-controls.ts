import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { UserTrainingAddForm } from './user-training-add-form';

export class UserTrainingAddControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: UserTrainingAddForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'title',
            placeholder: 'Title',
            label: 'Title'
          }
        ]
      },
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'select',
            formControlName: 'type',
            placeholder: 'Type',
            label: 'Type',
            values: ['Endurance', 'Strength', 'Balance', 'Flexibility', 'Other']
          }
        ]
      }
    ];
  }
}
