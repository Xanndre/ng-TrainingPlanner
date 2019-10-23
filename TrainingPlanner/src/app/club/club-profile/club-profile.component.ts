import { Component, OnInit, Input } from '@angular/core';
import { ClubProfileForm } from './club-profile-form';
import { ClubProfileControls } from './club-profile-controls';
import { FormBuilder } from '@angular/forms';
import { ClubGet } from 'src/app/models/ClubGet';
import { ClubPrice } from 'src/app/models/ClubPrice';
import { MatDialog } from '@angular/material';
import { ClubTrainerDialogComponent } from 'src/app/shared/club-trainer-dialog/club-trainer-dialog.component';
import { ClubActivityDialogComponent } from 'src/app/shared/club-activity-dialog/club-activity-dialog.component';
import { Picture } from 'src/app/models/Picture';
import { ClubWorkingHours } from 'src/app/models/ClubWorkingHours';
import { ClubService } from 'src/app/services/Club.service';
import { ClubUpdate } from 'src/app/models/ClubUpdate';
import { ActivatedRoute } from '@angular/router';
import { ClubActivity } from 'src/app/models/ClubActivity';
import { ClubTrainer } from 'src/app/models/ClubTrainer';
import { ClubCreate } from 'src/app/models/ClubCreate';
import { DataTransferService } from 'src/app/services/DataTransfer.service';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.css']
})
export class ClubProfileComponent implements OnInit {
  clubForm: ClubProfileForm = new ClubProfileForm();
  formControls: ClubProfileControls;
  isLoaded = true;
  isEdit: boolean;
  isClub: boolean;
  club: ClubGet;
  clubCreate: ClubCreate;
  clubId: number;
  priceList: ClubPrice[] = [];
  workingHours: ClubWorkingHours[] = [];
  trainers: ClubTrainer[] = [];
  activities: ClubActivity[] = [];
  pictures: Picture[] = [];
  beforeChanges: ClubUpdate;
  counter = 0;

  @Input() table: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private clubService: ClubService,
    private dataTransferService: DataTransferService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.snapshot.queryParams.id) {
      this.clubId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    } else {
      this.clubId = null;
      this.club = null;
    }
    if (this.clubId === null) {
      this.formControls = new ClubProfileControls();
      this.clubForm.buildForm(this.formBuilder, this.club);
      this.formControls.initializeControls(this.clubForm);
      this.isLoaded = true;
    } else {
      // console.log('xxxx');
      // this.clubService.getClub(this.clubId).subscribe(response => {
      //   if (this.club !== null) {
      //     this.isEdit = true;
      //   }
      //   this.club = response;
      //   this.isLoaded = true;
      //   this.beforeChanges = JSON.parse(JSON.stringify(this.club));
      //   this.formControls = new ClubProfileControls();
      //   this.clubForm.buildForm(this.formBuilder, this.club);
      //   this.formControls.initializeControls(this.clubForm);
      //   if (this.isEdit) {
      //     this.clubForm.clubForm.disable();
      //   }
      // });
    }
  }

  deleteClubAccount() {}

  createClubAccount() {
    this.priceList.forEach(el => (el.id = undefined));
    this.trainers.forEach(el => (el.id = undefined));
    this.workingHours.forEach(el => (el.id = undefined));
    this.activities.forEach(el => (el.id = undefined));
    for (let i = 0; i < this.pictures.length; i++) {
      this.pictures[i].displayOrder = i;
      if (i !== 0) {
        this.pictures[i].isMiniature = false;
      }
    }
    this.pictures[0].isMiniature = true;
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
    this.clubService.createClub(this.clubCreate).subscribe(() => {
      window.location.reload();
      console.log('Dodano konto klubu');
    });
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
    this.trainers = this.trainers.filter(value => {
      return value.name !== rowObj.name;
    });
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
}
