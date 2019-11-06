import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { ChangePasswordForm } from './change-password-form';

export class ChangePasswordControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: ChangePasswordForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.passwordForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email'
          },
          {
            formGroup: form.passwordForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'currentPassword',
            placeholder: 'Current password'
          },
          {
            formGroup: form.passwordForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'password',
            placeholder: 'New password'
          },
          {
            formGroup: form.passwordForm,
            controlType: 'input',
            type: 'password',
            formControlName: 'confirmPassword',
            placeholder: 'Confirm new password'
          }
        ]
      }
    ];
  }
}
