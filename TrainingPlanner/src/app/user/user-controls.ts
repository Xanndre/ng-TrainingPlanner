import { UserForm } from './user-form';
import { CustomControlGroup } from '../shared/custom-control-group/custom-control-group';

export class UserControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: UserForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.userForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'firstName',
            placeholder: 'First name',
            class: 'col mt-2',
            label: 'First name'
          },
          {
            formGroup: form.userForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'lastName',
            placeholder: 'Last name',
            class: 'col mt-2',
            label: 'Last name'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.userForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email',
            label: 'Email',
            class: 'col mt-2'
          },
          {
            formGroup: form.userForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'city',
            placeholder: 'Miasto',
            label: 'Miasto',
            class: 'col mt-2'
          }
        ],
        class: 'form-row mb-4'
      }
    ];
  }
}
