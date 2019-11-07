import { Component, OnInit } from '@angular/core';
import { ForgotPasswordForm } from './forgot-password-form';
import { ForgotPasswordControls } from './forgot-password-controls';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/Login.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm: ForgotPasswordForm = new ForgotPasswordForm();
  formControls: ForgotPasswordControls = new ForgotPasswordControls();
  email: string;
  isLoaded: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.passwordForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.passwordForm);
    this.isLoaded = true;
  }

  send() {
    this.email = this.passwordForm.passwordForm.value.email;
    this.loginService.sendResetToken(this.email).subscribe(
      () => {
        this.router.navigate(['/confirm/password_reset']);
      },
      err => {
        if (err.error === `There's no user with such email`) {
          this.showError(`There's no user with such email.`);
        } else {
          this.showError('Invalid send attempt.');
        }
      }
    );
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }
}
