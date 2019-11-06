import { CustomControlGroup } from '../custom-control-group/custom-control-group';
import { ChangePasswordDialogForm } from './change-password-dialog-form';

export class ChangePasswordDialogControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: ChangePasswordDialogForm) {
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
            formControlName: 'oldPassword',
            placeholder: 'Old password'
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
