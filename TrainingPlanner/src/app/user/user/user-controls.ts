import { UserForm } from './user-form';
import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';

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
            class: 'col mt-2'
          },
          {
            formGroup: form.userForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'lastName',
            placeholder: 'Last name',
            class: 'col mt-2'
          }
        ],
        class: 'form-row my-4'
      },
      {
        controls: [
          {
            formGroup: form.userForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email',
            class: 'col mt-2'
          },
          {
            formGroup: form.userForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'city',
            placeholder: 'Location',
            class: 'col mt-2'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.userForm,
            controlType: 'datePicker',
            formControlName: 'birthDate',
            placeholder: 'Birth date',
            class: 'col mt-2'
          },
          {
            formGroup: form.userForm,
            controlType: 'select',
            formControlName: 'gender',
            placeholder: 'Gender',
            values: ['Female', 'Male'],
            label: 'Gender',
            class: 'col mt-2'
          }
        ],
        class: 'form-row mb-4'
      }
    ];
  }
}
