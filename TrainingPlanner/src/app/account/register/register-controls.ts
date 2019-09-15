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
            class: 'mt-4'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'lastName',
            placeholder: 'Last name',
            class: 'mt-4'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email',
            class: 'mt-4'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'password',
            placeholder: 'Password',
            class: 'mt-4'
          }
        ],
        title: 'Create new account'
      }
    ];
  }
}
