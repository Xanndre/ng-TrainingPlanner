import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { UserProfileForm } from './user-profile-form';
import { UserService } from 'src/app/services/User.service';
import { FormBuilder } from '@angular/forms';
import { UserProfileControls } from './user-profile-controls';
import { MatDialog } from '@angular/material';
import { DeleteUserDialogComponent } from 'src/app/shared/delete-user-dialog/delete-user-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  beforeChanges: User;
  userId: string;
  isLoaded = false;
  isEdited = false;
  userForm: UserProfileForm = new UserProfileForm();
  formControls: UserProfileControls = new UserProfileControls();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;

      this.isLoaded = true;
      this.beforeChanges = JSON.parse(JSON.stringify(this.user));

      this.userForm.buildForm(this.formBuilder, this.user);
      this.formControls.initializeControls(this.userForm);
      this.userForm.userForm.disable();
    });
  }

  deleteAccount() {
    this.showError(
      'Do you really want to delete this profile? This process cannot be undone.'
    );
  }

  showError(error: string): void {
    this.dialog.open(DeleteUserDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  editUserData() {
    this.isEdited = true;
    this.setEditedData();
    this.userForm.userForm.enable();
  }

  setEditedData() {
    this.user.city = this.userForm.userForm.value.city;
    this.user.email = this.userForm.userForm.value.email;
    this.user.firstName = this.userForm.userForm.value.firstName;
    this.user.lastName = this.userForm.userForm.value.lastName;
    this.user.birthDate = this.userForm.userForm.value.birthDate;
    this.user.gender = this.userForm.userForm.value.gender;
    const date = new Date(this.user.birthDate);
    this.user.birthDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  cancel() {
    this.isEdited = false;
    this.user = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setUserData();
    this.userForm.userForm.markAsPristine();
    this.userForm.userForm.markAsUntouched();
    this.userForm.userForm.updateValueAndValidity();
    this.userForm.userForm.disable();
  }

  saveUserData() {
    this.isEdited = false;
    this.setEditedData();
    this.userService.updateUser(this.user).subscribe(() => {});
    this.beforeChanges = JSON.parse(JSON.stringify(this.user));
    this.userForm.userForm.disable();
  }

  setUserData() {
    this.userForm.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      city: this.user.city,
      birthDate: this.user.birthDate,
      gender: this.user.gender
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
  }

  changePassword() {
    this.router.navigate(['/change_password']);
  }
}
