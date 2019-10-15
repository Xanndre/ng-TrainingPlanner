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
  trainer: Trainer;
  isLoaded: boolean;

  constructor(
    private sportService: SportService,
    private trainerService: TrainerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.trainerService.getTrainerByUser(this.userId).subscribe(response => {
      this.trainer = response;
      if (response !== null) {
        this.isTrainer = true;
        console.log(this.trainer);
      }
      this.isLoaded = true;
      // this.beforeChanges = JSON.parse(JSON.stringify(this.user));
      this.formControls = new TrainerProfileControls(this.sportService);
      this.trainerForm.buildForm(this.formBuilder, this.trainer);
      this.formControls.initializeControls(this.trainerForm);
      if (this.isTrainer) {
        // this.trainerForm.trainerForm.disable();
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
}
