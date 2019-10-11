import { Component, OnInit } from '@angular/core';
import { TrainerAddControls } from './trainer-add-controls';
import { TrainerAddForm } from './trainer-add-form';
import { SportService } from 'src/app/services/Sport.service';
import { FormBuilder } from '@angular/forms';
import { TrainerCreate } from 'src/app/models/TrainerCreate';
import { TrainerService } from 'src/app/services/Trainer.service';
import { TrainerSport } from 'src/app/models/TrainerSport';

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

  constructor(
    private sportService: SportService,
    private trainerService: TrainerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formControls = new TrainerAddControls(this.sportService);
    this.trainerForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.trainerForm);
  }

  createTrainerAccount() {
    this.sportService
      .getSportsByNames(this.trainerForm.trainerForm.value.sports)
      .subscribe(response => {
        response.forEach(s =>
          this.sports.push({
            trainerId: 0,
            trainer: null,
            sportId: s.id,
            sport: s
          })
        );
        this.trainerCreate = {
          userId: localStorage.getItem('userId'),
          description: this.trainerForm.trainerForm.value.description,
          sports: this.sports
        };
        console.log(this.sports);
        this.trainerService.createTrainer(this.trainerCreate).subscribe(() => {
          console.log('Dodano konto trenerskie');
        });
      });
  }
}
