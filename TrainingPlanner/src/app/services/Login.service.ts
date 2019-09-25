import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterData } from '../models/RegisterData';
import { LoginData } from '../models/LoginData';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private jwtHelper: JwtHelperService,
    private client: HttpClient
  ) { }

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
      'http://localhost:65258/api/Account/Register',
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
      'http://localhost:65258/api/Account/Login',
      loginData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
