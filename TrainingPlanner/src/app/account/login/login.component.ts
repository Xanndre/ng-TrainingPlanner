import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginData } from '../../models/LoginData';
import { LoginForm } from './login-form';
import { LoginControls } from './login-controls';
import { LoginService } from 'src/app/services/Login.service';
import { ExternalLogin } from 'src/app/models/ExternalLogin';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: LoginData;
  externalLogin: ExternalLogin;
  loginForm: LoginForm = new LoginForm();
  formControls: LoginControls = new LoginControls();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.loginForm);
  }

  signIn() {
    this.login = {
      email: this.loginForm.loginForm.value.email,
      password: this.loginForm.loginForm.value.password
    };

    this.loginService.login(this.login).subscribe(
      response => {
        const res = response as any;
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('userId', res.id);
        this.router.navigate(['/user']);
      },
      () => {
        this.showError('Invalid login attempt.');
      }
    );
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error }, width: '400px'
    });
  }

  signInWithFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialUser => {
      this.externalSignIn(socialUser);
    });
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
      this.externalSignIn(socialUser);
    });
  }

  externalSignIn(socialUser: SocialUser) {
    this.externalLogin = {
      loginProvider: socialUser.provider,
      providerKey: socialUser.id,
      email: socialUser.email,
      token: socialUser.provider === 'FACEBOOK' ? socialUser.authToken : socialUser.idToken,
      firstName: socialUser.firstName,
      lastName: socialUser.lastName,
      profilePicture: socialUser.photoUrl
    };
    this.loginService.externalLogin(this.externalLogin).subscribe(
      (response: any) => {
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('username', response.username);
        this.router.navigate(['/user']);
      },
      () => {
        this.showError('Invalid login attempt.');
      }
    );
  }
}
