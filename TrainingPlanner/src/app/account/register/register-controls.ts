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
            placeholder: 'First name'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'lastName',
            placeholder: 'Last name'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email'
          },
          {
            formGroup: form.registerForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'password',
            placeholder: 'Password'
          }
        ],
        title: 'Create new account'
      }
    ];
  }
}
