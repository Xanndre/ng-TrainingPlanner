import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterData } from '../models/Account/RegisterData';
import { ExternalLogin } from '../models/Account/ExternalLogin';
import { LoginData } from '../models/Account/LoginData';
import { ChangePassword } from '../models/User/ChangePassword';
import { ResetPassword } from '../models/User/ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private jwtHelper: JwtHelperService,
    private client: HttpClient
  ) {}

  isUserAuthenticated() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  register(registerData: RegisterData) {
    return this.client.post(
      'https://localhost:44383/api/Account/Register',
      registerData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  login(loginData: LoginData) {
    return this.client.post(
      'https://localhost:44383/api/Account/Login',
      loginData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  externalLogin(login: ExternalLogin) {
    return this.client.post(
      'https://localhost:44383/api/Account/Login/External',
      login,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  sendEmailAgain(id: string) {
    return this.client
      .get(`https://localhost:44383/api/Account/send/${id}`)
      .pipe();
  }

  changePassword(object: ChangePassword) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post(
        'https://localhost:44383/api/Account/change_password',
        object,
        options
      )
      .pipe();
  }

  sendResetToken(email: string) {
    const params = new HttpParams().set('email', email);
    const options = {
      params
    };
    return this.client
      .get('https://localhost:44383/api/Account/generate_reset_token', options)
      .pipe();
  }

  sendResetTokenAgain(id: string) {
    const params = new HttpParams().set('id', id);
    const options = {
      params
    };
    return this.client
      .get(
        'https://localhost:44383/api/Account/generate_reset_token_again',
        options
      )
      .pipe();
  }

  resetPassword(object: ResetPassword) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.client
      .post(
        'https://localhost:44383/api/Account/reset_password',
        object,
        options
      )
      .pipe();
  }
}
