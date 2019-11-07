import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { ResetPasswordForm } from './reset-password-form';

export class ResetPasswordControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: ResetPasswordForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.passwordForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'password',
            placeholder: 'Password'
          },
          {
            formGroup: form.passwordForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'confirmPassword',
            placeholder: 'Confirm password'
          }
        ]
      }
    ];
  }
}
