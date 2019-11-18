import { Component, OnInit, Input } from '@angular/core';
import { TrainerPrice } from 'src/app/models/TrainerStuff/TrainerPrice';
import { TrainerSport } from 'src/app/models/TrainerStuff/TrainerSport';
import { TrainerCreate } from 'src/app/models/Trainer/TrainerCreate';
import { TrainerProfileControls } from './trainer-profile-controls';
import { TrainerProfileForm } from './trainer-profile-form';
import { SportService } from 'src/app/services/Sport.service';
import { TrainerService } from 'src/app/services/Trainer.service';
import { FormBuilder } from '@angular/forms';
import { Trainer } from 'src/app/models/Trainer/Trainer';
import { TrainerUpdate } from 'src/app/models/Trainer/TrainerUpdate';
import { MatDialog } from '@angular/material';
import { DataTransferService } from 'src/app/services/DataTransfer.service';
import { DeleteTrainerDialogComponent } from 'src/app/shared/delete-trainer-dialog/delete-trainer-dialog.component';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {
  trainerForm: TrainerProfileForm = new TrainerProfileForm();
  formControls: TrainerProfileControls;
  trainerCreate: TrainerCreate;
  trainerUpdate: TrainerUpdate = new TrainerUpdate();
  sports: TrainerSport[] = [];
  priceList: TrainerPrice[] = [];
  isTrainer: boolean;
  userId: string;
  trainer: Trainer;
  beforeChanges: TrainerUpdate;
  isLoaded: boolean;
  isEdited = false;

  @Input() table: any;

  constructor(
    private sportService: SportService,
    private trainerService: TrainerService,
    private dataTransferService: DataTransferService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.trainerService.getTrainerByUser(this.userId).subscribe(response => {
      this.trainer = response;
      if (this.trainer !== null) {
        this.isTrainer = true;
      }
      this.isLoaded = true;
      this.beforeChanges = JSON.parse(JSON.stringify(this.trainer));
      this.formControls = new TrainerProfileControls(this.sportService);
      this.trainerForm.buildForm(this.formBuilder, this.trainer);
      this.formControls.initializeControls(this.trainerForm);
      if (this.isTrainer) {
        this.trainerForm.trainerForm.disable();
      }
    });
  }

  createTrainerAccount() {
    this.sportService
      .getSportsByNames(this.trainerForm.trainerForm.value.sports)
      .subscribe(response => {
        response.forEach(s =>
          this.sports.push({
            trainerId: 0,
            sportId: s.id,
            sport: null
          })
        );
        this.priceList.forEach(el => (el.id = undefined));
        this.trainerCreate = {
          userId: localStorage.getItem('userId'),
          description: this.trainerForm.trainerForm.value.description,
          phoneNumber: this.trainerForm.trainerForm.value.phoneNumber,
          sports: this.sports,
          priceList: this.priceList
        };
        this.trainerService.createTrainer(this.trainerCreate).subscribe(
          () => {
            window.location.reload();
          },
          () => {
            this.showError('Invalid trainer profile creation attempt.');
          }
        );
      });
  }

  receivePriceList($event) {
    this.priceList = $event;
  }

  editTrainerAccount() {
    this.isEdited = true;
    this.setEditedData();
    this.trainerForm.trainerForm.enable();
  }

  setEditedData() {
    this.trainerUpdate.description = this.trainerForm.trainerForm.value.description;
    this.trainerUpdate.phoneNumber = this.trainerForm.trainerForm.value.phoneNumber;
    this.trainerUpdate.userId = this.trainer.user.id;
    this.trainerUpdate.id = this.trainer.id;
    this.trainerUpdate.viewCounter = this.trainer.viewCounter;
  }

  cancel() {
    this.isEdited = false;
    this.trainerUpdate = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setTrainerData();
    this.trainerForm.trainerForm.markAsPristine();
    this.trainerForm.trainerForm.markAsUntouched();
    this.trainerForm.trainerForm.updateValueAndValidity();
    this.trainerForm.trainerForm.disable();
  }

  saveTrainerData() {
    this.isEdited = false;
    this.setEditedData();
    this.sportService
      .getSportsByNames(this.trainerForm.trainerForm.value.sports)
      .subscribe(response => {
        this.sports = [];
        response.forEach(s => {
          this.sports.push({
            trainerId: this.trainer.id,
            sportId: s.id,
            sport: null
          });
        });
        this.trainerUpdate.sports = this.sports;
        this.trainerUpdate.priceList = this.priceList;
        this.trainerUpdate.priceList.forEach(p => {
          p.trainerId = this.trainerUpdate.id;
          p.id = undefined;
        });
        this.trainerService.updateTrainer(this.trainerUpdate).subscribe(
          () => {},
          () => {
            this.showError('Invalid trainer profile edition attempt.');
          }
        );
        this.beforeChanges = JSON.parse(JSON.stringify(this.trainer));
        this.trainerForm.trainerForm.disable();
      });
  }

  setTrainerData() {
    const sportNames: string[] = [];
    this.trainer.sports.forEach(s => {
      sportNames.push(s.sport.name);
    });
    this.trainerForm.trainerForm.value.sports = sportNames;
    this.trainerForm.trainerForm.setValue({
      description: this.trainer.description,
      phoneNumber: this.trainer.phoneNumber,
      sports: sportNames
    });
    this.priceList = this.beforeChanges.priceList;
  }

  deleteTrainerAccount() {
    this.dataTransferService.setTrainerId(this.trainer.id);
    this.openDeleteDialog(
      'Do you really want to delete this trainer profile? This process cannot be undone.'
    );
  }

  openDeleteDialog(error: string): void {
    this.dialog.open(DeleteTrainerDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  viewSales() {
    this.router.navigate([`trainers/${this.trainer.id}/cards`]);
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  goToCalendar() {
    this.router.navigate([`/profile/trainers/${this.trainer.id}/calendar`]);
  }
}
