import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterData } from '../../models/Account/RegisterData';
import { Router } from '@angular/router';
import { RegisterForm } from './register-form';
import { RegisterControls } from './register-controls';
import { LoginService } from 'src/app/services/Login.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: RegisterData;
  registerForm: RegisterForm = new RegisterForm();
  formControls: RegisterControls = new RegisterControls();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private dialog: MatDialog
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

    this.loginService.register(this.registerData).subscribe(
      () => {
        this.router.navigate(['/confirm']);
      },
      () => {
        this.showError('Invalid registration attempt.');
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
