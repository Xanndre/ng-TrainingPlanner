import { LoginForm } from './login-form';
import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';

export class LoginControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: LoginForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.loginForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email'
          },
          {
            formGroup: form.loginForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'password',
            placeholder: 'Password'
          }
        ],
        title: 'Sign in'
      }
    ];
  }
}
