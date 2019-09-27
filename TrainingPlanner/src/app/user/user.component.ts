import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserForm } from './user-form';
import { UserControls } from './user-controls';
import { UserService } from '../services/User.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  beforeChanges: User;
  userId: string;
  isReadOnly = true;
  isLoaded = false;
  isEdited = false;
  isPictureLoaded = false;
  userForm: UserForm = new UserForm();
  formControls: UserControls = new UserControls();


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;

      this.isLoaded = true;
      this.beforeChanges = JSON.parse(JSON.stringify(this.user));

      this.userForm.buildForm(this.formBuilder, this.user);
      this.formControls.initializeControls(this.userForm);
    });
  }

  editUserData() {
    this.isReadOnly = false;
    this.isEdited = true;
    this.setEditedData();
  }

  setEditedData() {
    this.user.city = this.userForm.userForm.value.city;
    this.user.email = this.userForm.userForm.value.email;
    this.user.firstName = this.userForm.userForm.value.firstName;
    this.user.lastName = this.userForm.userForm.value.lastName;
    const date = new Date(this.user.birthDate);
    this.user.birthDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  cancel() {
    this.isReadOnly = true;
    this.isEdited = false;
    this.user = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setUserData();
    this.userForm.userForm.markAsPristine();
    this.userForm.userForm.markAsUntouched();
    this.userForm.userForm.updateValueAndValidity();
  }

  saveUserData() {
    this.isEdited = false;
    this.isReadOnly = true;
    this.setEditedData();
    this.userService.updateUser(this.user).subscribe(() => { });
    this.beforeChanges = JSON.parse(JSON.stringify(this.user));
  }

  setUserData() {
    this.userForm.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      city: this.user.city
    });
  }

  changePictureListener($event): void {
    this.readPicture($event.target);
  }

  readPicture(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = () => {
      this.user.profilePicture = myReader.result.toString();
    };
    myReader.readAsDataURL(file);

    this.isPictureLoaded = true;
  }

}
