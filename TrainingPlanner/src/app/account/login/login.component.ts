import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginData } from '../../models/LoginData';
import { LoginForm } from './login-form';
import { LoginControls } from './login-controls';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  login: LoginData;
  loginForm: LoginForm = new LoginForm();
  formControls: LoginControls = new LoginControls();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

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
        this.invalidLogin = false;
        this.router.navigate(['/user']);
      },
      () => {
        this.invalidLogin = true;
      }
    );
  }
}
