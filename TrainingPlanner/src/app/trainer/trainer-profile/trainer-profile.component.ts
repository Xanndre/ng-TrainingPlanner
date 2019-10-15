import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/Trainer';
import { TrainerPrice } from 'src/app/models/TrainerPrice';
import { TrainerSport } from 'src/app/models/TrainerSport';
import { TrainerCreate } from 'src/app/models/TrainerCreate';
import { TrainerProfileControls } from './trainer-profile-controls';
import { TrainerProfileForm } from './trainer-profile-form';
import { SportService } from 'src/app/services/Sport.service';
import { TrainerService } from 'src/app/services/Trainer.service';
import { FormBuilder } from '@angular/forms';
import { TrainerGet } from 'src/app/models/TrainerGet';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {
  trainerForm: TrainerProfileForm = new TrainerProfileForm();
  formControls: TrainerProfileControls;
  trainerCreate: TrainerCreate;
  sports: TrainerSport[] = [];
  priceList: TrainerPrice[] = [];
  isTrainer: boolean;
  userId: string;
  trainer: TrainerGet;
  beforeChanges: Trainer;
  isLoaded: boolean;
  isEdited = false;

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
        console.log(this.priceList);
        console.log(this.sports);
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
    this.trainer.description = this.trainerForm.trainerForm.value.description;
    //this.trainer.sports =
    //this.trainer.priceList =
  }

  cancel() {
    this.isEdited = false;
    this.trainer = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setTrainerData();
    this.trainerForm.trainerForm.markAsPristine();
    this.trainerForm.trainerForm.markAsUntouched();
    this.trainerForm.trainerForm.updateValueAndValidity();
    this.trainerForm.trainerForm.disable();
  }

  saveTrainerData() {
    this.isEdited = false;
    this.setEditedData();
    // this.trainerService.updateTrainer(this.trainer).subscribe(() => {});
    this.beforeChanges = JSON.parse(JSON.stringify(this.trainer));
    this.trainerForm.trainerForm.disable();
  }

  setTrainerData() {
    this.trainerForm.trainerForm.setValue({
      description: this.trainer.description,
      sports: this.trainer.sports,
      priceList: this.trainer.priceList
    });
  }
}
