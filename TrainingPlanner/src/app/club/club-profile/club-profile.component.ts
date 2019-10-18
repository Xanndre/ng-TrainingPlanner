import { Component, OnInit, Input } from '@angular/core';
import { ClubProfileForm } from './club-profile-form';
import { ClubProfileControls } from './club-profile-controls';
import { FormBuilder } from '@angular/forms';
import { ClubGet } from 'src/app/models/ClubGet';
import { ClubPrice } from 'src/app/models/ClubPrice';
import { ClubTrainer } from 'src/app/models/ClubTrainer';
import { MatDialog } from '@angular/material';
import { ClubtrainerAddDialogComponent } from 'src/app/shared/clubtrainer-add-dialog/clubtrainer-add-dialog.component';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.css']
})
export class ClubProfileComponent implements OnInit {
  clubForm: ClubProfileForm = new ClubProfileForm();
  formControls: ClubProfileControls;
  isLoaded = true;
  isClub: boolean;
  club: ClubGet = null;
  clubId: number;
  priceList: ClubPrice[] = [];
  trainers: ClubTrainer[] = [];
  counter = 0;

  @Input() table: any;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.trainers.push({
      id: 1,
      name: 'Anita',
      description: 'Volleyball | Basketball | Crossfit',
      picture: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    });
    this.trainers.push({
      id: 2,
      name: 'Karolina',
      description: 'Fitness | Canoeing | Crossfit',
      picture: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    });
    this.formControls = new ClubProfileControls();
    this.clubForm.buildForm(this.formBuilder, this.club);
    this.formControls.initializeControls(this.clubForm);
  }

  deleteClubAccount() {}

  createClubAccount() {}

  receivePriceList($event) {
    this.priceList = $event;
  }

  openAddDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ClubtrainerAddDialogComponent, {
      width: '268px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Add') {
          this.addData(result.data);
        } else if (result.event === 'Edit') {
          console.log('Edytujemy');
          this.editData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteData(result.data);
        }
      }
    });
  }

  addData(rowObj: ClubTrainer) {
    this.trainers.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      name: rowObj.name,
      description: rowObj.description,
      picture: rowObj.picture
    });
  }

  editData(rowObj) {
    this.trainers = this.trainers.filter(value => {
      if (value.id === rowObj.id) {
        console.log('Dupa');
        value.name = rowObj.name;
        (value.description = rowObj.description),
          (value.picture = rowObj.picture);
      }
      return true;
    });
  }
  deleteData(rowObj) {
    this.trainers = this.trainers.filter(value => {
      return value.name !== rowObj.name;
    });
  }
}
