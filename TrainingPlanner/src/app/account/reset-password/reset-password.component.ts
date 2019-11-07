import { Component, OnInit } from '@angular/core';
import { ResetPasswordForm } from './reset-password-form';
import { ResetPasswordControls } from './reset-password-controls';
import { MatDialog } from '@angular/material';
import { LoginService } from 'src/app/services/Login.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPassword } from 'src/app/models/User/ResetPassword';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: ResetPasswordForm = new ResetPasswordForm();
  formControls: ResetPasswordControls = new ResetPasswordControls();
  token: string;
  id: string;
  isLoaded = false;
  object: ResetPassword;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.passwordForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.passwordForm);
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.isLoaded = true;
  }

  reset() {
    this.object = {
      userId: this.id,
      token: this.token,
      password: this.passwordForm.passwordForm.value.password
    };
    this.loginService.resetPassword(this.object).subscribe(
      () => {
        this.router.navigate([`reset/success/${this.id}`]);
      },
      err => {
        if (err.error === `There's no user with such email`) {
          this.router.navigate(['confirm/nouser']);
        } else {
          this.router.navigate([`reset/error/${this.id}`]);
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
