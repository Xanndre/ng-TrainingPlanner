import { Component, OnInit, Input } from '@angular/core';
import { ClubProfileForm } from './club-profile-form';
import { ClubProfileControls } from './club-profile-controls';
import { FormBuilder } from '@angular/forms';
import { ClubGet } from 'src/app/models/ClubGet';
import { ClubPrice } from 'src/app/models/ClubPrice';
import { ClubTrainer } from 'src/app/models/ClubTrainer';
import { MatDialog } from '@angular/material';
import { ClubTrainerDialogComponent } from 'src/app/shared/club-trainer-dialog/club-trainer-dialog.component';
import { ClubActivity } from 'src/app/models/ClubActivity';
import { ClubActivityDialogComponent } from 'src/app/shared/club-activity-dialog/club-activity-dialog.component';
import { Picture } from 'src/app/models/Picture';

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
  activities: ClubActivity[] = [];
  pictures: Picture[] = [];
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

    this.activities.push({
      id: 1,
      name: 'Fit And Jump',
      duration: 60,
      calories: 600,
      level: 'For advanced',
      picture: 'https://i.ibb.co/d0Zg3qs/newgym.png'
    });
    this.activities.push({
      id: 2,
      name: 'Group Training',
      duration: 45,
      calories: 700,
      level: 'For beginners',
      picture: 'https://i.ibb.co/d0Zg3qs/newgym.png'
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
    const dialogRef = this.dialog.open(ClubTrainerDialogComponent, {
      width: '268px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Add') {
          this.addData(result.data);
        } else if (result.event === 'Edit') {
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
      picture:
        rowObj.picture !== undefined
          ? rowObj.picture
          : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    });
  }

  editData(rowObj) {
    this.trainers = this.trainers.filter(value => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
        (value.description = rowObj.description),
          (value.picture =
            rowObj.picture !== null
              ? rowObj.picture
              : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png');
      }
      return true;
    });
  }
  deleteData(rowObj) {
    this.trainers = this.trainers.filter(value => {
      return value.name !== rowObj.name;
    });
  }

  openActivityDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ClubActivityDialogComponent, {
      width: '268px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Add') {
          this.addActivity(result.data);
        } else if (result.event === 'Edit') {
          this.editActivity(result.data);
        } else if (result.event === 'Delete') {
          this.deleteActivity(result.data);
        }
      }
    });
  }

  deleteActivity(rowObj) {
    this.activities = this.activities.filter(value => {
      return value.name !== rowObj.name;
    });
  }

  addActivity(rowObj: ClubActivity) {
    this.activities.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      name: rowObj.name,
      duration: rowObj.duration,
      calories: rowObj.calories,
      level: rowObj.level,
      picture:
        rowObj.picture !== undefined
          ? rowObj.picture
          : 'https://i.ibb.co/d0Zg3qs/newgym.png'
    });
  }

  editActivity(rowObj) {
    this.activities = this.activities.filter(value => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
        (value.duration = rowObj.duration),
          (value.level = rowObj.level),
          (value.picture =
            rowObj.picture !== null
              ? rowObj.picture
              : 'https://i.ibb.co/d0Zg3qs/newgym.png'),
          (value.calories = rowObj.calories);
      }
      return true;
    });
  }
}
