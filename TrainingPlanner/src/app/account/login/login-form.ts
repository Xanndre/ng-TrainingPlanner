import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

export class LoginForm {
  loginForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
}
