import { Component, OnInit } from '@angular/core';
import { TrainerAddControls } from './trainer-add-controls';
import { TrainerAddForm } from './trainer-add-form';
import { SportService } from 'src/app/services/Sport.service';
import { FormBuilder } from '@angular/forms';
import { TrainerCreate } from 'src/app/models/TrainerCreate';
import { TrainerService } from 'src/app/services/Trainer.service';
import { TrainerSport } from 'src/app/models/TrainerSport';
import { Trainer } from 'src/app/models/Trainer';
import { TrainerPrice } from 'src/app/models/TrainerPrice';

@Component({
  selector: 'app-trainer-add',
  templateUrl: './trainer-add.component.html',
  styleUrls: ['./trainer-add.component.css']
})
export class TrainerAddComponent implements OnInit {
  trainerForm: TrainerAddForm = new TrainerAddForm();
  formControls: TrainerAddControls;
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
      this.formControls = new TrainerAddControls(this.sportService);
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
