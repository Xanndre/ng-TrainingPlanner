import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class ForgotPasswordForm {
  passwordForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.maxLength(40), Validators.email]
      ]
    });
  }
}
