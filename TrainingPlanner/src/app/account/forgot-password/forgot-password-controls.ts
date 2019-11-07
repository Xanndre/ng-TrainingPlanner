import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { ChangePasswordForm } from '../change-password/change-password-form';

export class ForgotPasswordControls {
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
          }
        ]
      }
    ];
  }
}
