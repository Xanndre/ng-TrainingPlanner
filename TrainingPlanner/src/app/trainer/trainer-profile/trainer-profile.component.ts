import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrainerPrice } from 'src/app/models/TrainerPrice';
import { TrainerSport } from 'src/app/models/TrainerSport';
import { TrainerCreate } from 'src/app/models/TrainerCreate';
import { TrainerProfileControls } from './trainer-profile-controls';
import { TrainerProfileForm } from './trainer-profile-form';
import { SportService } from 'src/app/services/Sport.service';
import { TrainerService } from 'src/app/services/Trainer.service';
import { FormBuilder } from '@angular/forms';
import { TrainerGet } from 'src/app/models/TrainerGet';
import { TrainerUpdate } from 'src/app/models/TrainerUpdate';

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
  trainer: TrainerGet;
  beforeChanges: TrainerUpdate;
  isLoaded: boolean;
  isEdited = false;

  @Input() table: any;

  constructor(
    private sportService: SportService,
    private trainerService: TrainerService,
    private formBuilder: FormBuilder
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
            sportName: s.name
          })
        );
        this.priceList.forEach(el => (el.id = undefined));
        this.trainerCreate = {
          userId: localStorage.getItem('userId'),
          description: this.trainerForm.trainerForm.value.description,
          sports: this.sports,
          priceList: this.priceList
        };
        this.trainerService.createTrainer(this.trainerCreate).subscribe(() => {
          console.log('Dodano konto trenerskie');
        });
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
    this.trainerUpdate.userId = this.trainer.user.id;
    this.trainerUpdate.id = this.trainer.id;
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
            sportName: s.name
          });
        });
        this.trainerUpdate.sports = this.sports;
        this.trainerUpdate.priceList = this.priceList;
        this.trainerUpdate.priceList.forEach(p => {
          p.trainerId = this.trainerUpdate.id;
          p.id = undefined;
        });
        this.trainerService
          .updateTrainer(this.trainerUpdate)
          .subscribe(() => {});
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
      sports: sportNames
    });
    this.priceList = this.beforeChanges.priceList;
  }
}
