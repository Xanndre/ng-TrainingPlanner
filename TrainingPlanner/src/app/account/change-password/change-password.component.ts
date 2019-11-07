import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/Login.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ChangePassword } from 'src/app/models/User/ChangePassword';
import { ChangePasswordControls } from './change-password-controls';
import { ChangePasswordForm } from './change-password-form';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: ChangePasswordForm = new ChangePasswordForm();
  formControls: ChangePasswordControls = new ChangePasswordControls();
  object: ChangePassword;
  userId: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.passwordForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.passwordForm);
    this.userId = localStorage.getItem('userId');
  }

  changePassword() {
    this.object = {
      userId: this.userId,
      email: this.passwordForm.passwordForm.value.email,
      currentPassword: this.passwordForm.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.passwordForm.value.password
    };
    this.loginService.changePassword(this.object).subscribe(
      () => {
        this.router.navigate(['/profile/user']);
      },
      err => {
        if (err.error === `There's no user with such email`) {
          this.showError(`There's no user with such email.`);
        } else if (err.error === `Provided email address doesn't match yours`) {
          this.showError(`Provided email address doesn't match yours.`);
        } else {
          this.showError('Invalid password change attempt.');
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
