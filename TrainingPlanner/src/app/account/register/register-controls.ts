import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { RegisterForm } from './register-form';

export class RegisterControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: RegisterForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'firstName',
            placeholder: 'First name',
            class: 'col'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'lastName',
            placeholder: 'Last name',
            class: 'col'
          }
        ],
        title: 'Create new account',
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email',
            class: 'col'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'city',
            placeholder: 'Location',
            class: 'col'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'password',
            placeholder: 'Password',
            class: 'col'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'confirmPassword',
            placeholder: 'Confirm password',
            class: 'col'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.registerForm,
            controlType: 'datePicker',
            formControlName: 'birthDate',
            placeholder: 'Birth date',
            class: 'col mt-2'
          },
          {
            formGroup: form.registerForm,
            controlType: 'select',
            formControlName: 'gender',
            placeholder: 'Gender',
            label: 'Gender',
            values: ['Female', 'Male'],
            class: 'col mt-2'
          }
        ],
        class: 'form-row mb-4'
      }
    ];
  }
}
