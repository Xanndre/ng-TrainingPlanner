import { Component, OnInit, Input } from '@angular/core';
import { ClubProfileForm } from './club-profile-form';
import { ClubProfileControls } from './club-profile-controls';
import { FormBuilder } from '@angular/forms';
import { Club } from 'src/app/models/Club/Club';
import { ClubPrice } from 'src/app/models/ClubStuff/ClubPrice';
import { MatDialog } from '@angular/material';
import { ClubTrainerDialogComponent } from 'src/app/shared/club-trainer-dialog/club-trainer-dialog.component';
import { ClubActivityDialogComponent } from 'src/app/shared/club-activity-dialog/club-activity-dialog.component';
import { Picture } from 'src/app/models/Stuff/Picture';
import { ClubWorkingHours } from 'src/app/models/ClubStuff/ClubWorkingHours';
import { ClubService } from 'src/app/services/Club.service';
import { ClubUpdate } from 'src/app/models/Club/ClubUpdate';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubActivity } from 'src/app/models/ClubStuff/ClubActivity';
import { ClubTrainer } from 'src/app/models/ClubStuff/ClubTrainer';
import { ClubCreate } from 'src/app/models/Club/ClubCreate';
import { DataTransferService } from 'src/app/services/DataTransfer.service';
import { DeleteClubDialogComponent } from 'src/app/shared/delete-club-dialog/delete-club-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.css']
})
export class ClubProfileComponent implements OnInit {
  clubForm: ClubProfileForm = new ClubProfileForm();
  formControls: ClubProfileControls;
  isLoaded: boolean;
  isEdit = false;
  isEdited: boolean;
  isAdd = false;
  club: Club = null;
  clubCreate: ClubCreate;
  clubId = null;
  priceList: ClubPrice[] = [];
  workingHours: ClubWorkingHours[] = [];
  trainers: ClubTrainer[] = [];
  activities: ClubActivity[] = [];
  pictures: Picture[] = [];
  beforeChanges: ClubUpdate;
  counter = 0;
  userId: string;
  clubUpdate: ClubUpdate = new ClubUpdate();
  miniatureIndex = 0;

  pageNumber = 1;
  pageSize = 3;
  isUser = true;
  isFavourite = false;

  @Input() table: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private clubService: ClubService,
    private dataTransferService: DataTransferService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data.edit) {
      this.isEdit = true;
      this.clubId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.clubService.getClub(this.clubId, false).subscribe(response => {
        this.club = response;
        this.beforeChanges = JSON.parse(JSON.stringify(this.club));
        this.formControls = new ClubProfileControls();
        this.clubForm.buildForm(this.formBuilder, this.club);
        this.formControls.initializeControls(this.clubForm);
        this.clubForm.clubForm.disable();
        this.pictures = response.pictures;
        this.activities = response.activities;
        this.trainers = response.trainers;
        this.priceList = response.priceList;
        this.workingHours = response.workingHours;
        this.pictures.sort((a, b) => {
          return a.displayOrder - b.displayOrder;
        });
        for (let i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].isMiniature) {
            this.miniatureIndex = i;
          }
        }
        this.isLoaded = true;
      });
    } else {
      if (this.route.snapshot.data.add) {
        this.isAdd = true;
      }
      this.userId = localStorage.getItem('userId');
      this.formControls = new ClubProfileControls();
      this.clubForm.buildForm(this.formBuilder, this.club);
      this.formControls.initializeControls(this.clubForm);
      this.isLoaded = true;
    }
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  editClubAccount() {
    this.isEdited = true;
    this.setEditedData();
    this.clubForm.clubForm.enable();
  }

  setEditedData() {
    this.clubUpdate.name = this.clubForm.clubForm.value.name;
    this.clubUpdate.description = this.clubForm.clubForm.value.description;
    this.clubUpdate.streetName = this.clubForm.clubForm.value.streetName;
    this.clubUpdate.streetNumber = this.clubForm.clubForm.value.streetNumber;
    this.clubUpdate.postalCode = this.clubForm.clubForm.value.postalCode;
    this.clubUpdate.city = this.clubForm.clubForm.value.city;
    this.clubUpdate.phoneNumber = this.clubForm.clubForm.value.phoneNumber;
    this.clubUpdate.email = this.clubForm.clubForm.value.email;
    this.clubUpdate.userId = this.club.user.id;
    this.clubUpdate.id = this.club.id;
    this.clubUpdate.viewCounter = this.club.viewCounter;
  }

  cancel() {
    this.isEdited = false;
    this.clubUpdate = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setClubData();
    this.clubForm.clubForm.markAsPristine();
    this.clubForm.clubForm.markAsUntouched();
    this.clubForm.clubForm.updateValueAndValidity();
    this.clubForm.clubForm.disable();
  }

  setClubData() {
    this.clubForm.clubForm.setValue({
      name: this.club.name,
      description: this.club.description,
      streetName: this.club.streetName,
      streetNumber: this.club.streetNumber,
      postalCode: this.club.postalCode,
      city: this.club.city,
      phoneNumber: this.club.phoneNumber,
      email: this.club.email
    });
    this.priceList = this.beforeChanges.priceList;
    this.workingHours = this.beforeChanges.workingHours;
    this.activities = this.beforeChanges.activities;
    this.trainers = this.beforeChanges.trainers;
    this.pictures = this.beforeChanges.pictures;
  }

  saveClubData() {
    this.isEdited = false;
    this.setEditedData();

    this.clubUpdate.workingHours = this.workingHours;
    this.clubUpdate.priceList = this.priceList;
    this.clubUpdate.trainers = this.trainers;
    this.clubUpdate.activities = this.activities;
    this.clubUpdate.pictures = this.pictures;

    this.clubUpdate.priceList.forEach(p => {
      p.clubId = this.clubUpdate.id;
      p.id = undefined;
    });
    this.clubUpdate.workingHours.forEach(p => {
      p.clubId = this.clubUpdate.id;
      p.id = undefined;
    });
    this.clubUpdate.activities.forEach(p => {
      p.clubId = this.clubUpdate.id;
      p.id = undefined;
    });
    this.clubUpdate.trainers.forEach(p => {
      p.clubId = this.clubUpdate.id;
      p.id = undefined;
    });
    this.clubService.updateClub(this.clubUpdate).subscribe(
      () => {},
      () => {
        this.showError('Invalid club profile edition attempt.');
      }
    );
    this.beforeChanges = JSON.parse(JSON.stringify(this.club));
    this.clubForm.clubForm.disable();
  }

  createClubAccount() {
    this.priceList.forEach(el => (el.id = undefined));
    this.trainers.forEach(el => (el.id = undefined));
    this.workingHours.forEach(el => (el.id = undefined));
    this.activities.forEach(el => (el.id = undefined));
    if (this.pictures.length > 0) {
      for (let i = 0; i < this.pictures.length; i++) {
        this.pictures[i].displayOrder = i;
        if (i !== 0) {
          this.pictures[i].isMiniature = false;
        }
      }
      this.pictures[0].isMiniature = true;
    }

    this.clubCreate = {
      userId: localStorage.getItem('userId'),
      name: this.clubForm.clubForm.value.name,
      description: this.clubForm.clubForm.value.description,
      streetName: this.clubForm.clubForm.value.streetName,
      streetNumber: this.clubForm.clubForm.value.streetNumber,
      postalCode: this.clubForm.clubForm.value.postalCode,
      city: this.clubForm.clubForm.value.city,
      phoneNumber: this.clubForm.clubForm.value.phoneNumber,
      email: this.clubForm.clubForm.value.email,
      priceList: this.priceList,
      workingHours: this.workingHours,
      trainers: this.trainers,
      activities: this.activities,
      pictures: this.pictures
    };
    this.clubService.createClub(this.clubCreate).subscribe(
      () => {
        this.router.navigate(['profile/clubs']);
      },
      () => {
        this.showError('Invalid club profile creation attempt.');
      }
    );
  }

  receivePriceList($event) {
    this.priceList = $event;
  }

  receiveWorkingHours($event) {
    this.workingHours = $event;
  }

  openTrainerDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ClubTrainerDialogComponent, {
      width: '268px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Add') {
          this.addTrainer(result.data);
        } else if (result.event === 'Edit') {
          this.editTrainer(result.data);
        } else if (result.event === 'Delete') {
          this.deleteTrainer(result.data);
        }
      }
    });
  }

  addTrainer(rowObj: ClubTrainer) {
    this.trainers.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      clubId: 0,
      name: rowObj.name,
      description: rowObj.description,
      picture:
        rowObj.picture !== undefined
          ? rowObj.picture
          : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    });
  }

  editTrainer(rowObj: ClubTrainer) {
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
  deleteTrainer(rowObj: ClubTrainer) {
    const temp = this.trainers.find(value => value.name === rowObj.name);
    if (temp === this.trainers[this.trainers.length - 1]) {
      this.dataTransferService.setIsDeleteTrainer(true);
    }
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

  deleteActivity(rowObj: ClubActivity) {
    const temp = this.activities.find(value => value.name === rowObj.name);
    if (temp === this.activities[this.activities.length - 1]) {
      this.dataTransferService.setIsDeleteActivity(true);
    }
    this.activities = this.activities.filter(value => {
      return value.name !== rowObj.name;
    });
  }

  addActivity(rowObj: ClubActivity) {
    this.activities.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      clubId: 0,
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

  editActivity(rowObj: ClubActivity) {
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

  goToCalendar() {
    // this.router.navigate(['profile/trainer/calendar']);
    // tutaj navigate do linka z kalendarzem klubu
  }
}
