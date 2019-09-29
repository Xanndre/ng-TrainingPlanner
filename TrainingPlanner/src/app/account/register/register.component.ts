import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterData } from '../../models/RegisterData';
import { Router } from '@angular/router';
import { RegisterForm } from './register-form';
import { RegisterControls } from './register-controls';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: RegisterData;
  registerForm: RegisterForm = new RegisterForm();
  invalidRegistration: boolean;
  formControls: RegisterControls = new RegisterControls();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.registerForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.registerForm);
  }

  register() {
    this.registerData = {
      firstName: this.registerForm.registerForm.value.firstName,
      lastName: this.registerForm.registerForm.value.lastName,
      email: this.registerForm.registerForm.value.email,
      password: this.registerForm.registerForm.value.password,
      birthDate: this.registerForm.registerForm.value.birthDate,
      gender: this.registerForm.registerForm.value.gender,
      city: this.registerForm.registerForm.value.city
    };
    const date = new Date(this.registerData.birthDate);
    this.registerData.birthDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    console.log(this.registerData);

    this.loginService.register(this.registerData).subscribe(
      () => {
        this.invalidRegistration = false;
        this.router.navigate(['/login']);
      },
      () => {
        this.invalidRegistration = true;
      }
    );
  }
}
