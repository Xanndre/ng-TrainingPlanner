import { Component, OnInit } from '@angular/core';
import { TrainerAddControls } from './trainer-add-controls';
import { TrainerAddForm } from './trainer-add-form';
import { SportService } from 'src/app/services/Sport.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-trainer-add',
  templateUrl: './trainer-add.component.html',
  styleUrls: ['./trainer-add.component.css']
})
export class TrainerAddComponent implements OnInit {
  trainerForm: TrainerAddForm = new TrainerAddForm();
  formControls: TrainerAddControls;

  constructor(
    private sportService: SportService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formControls = new TrainerAddControls(this.sportService);
    this.trainerForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.trainerForm);
  }

  createTrainerAccount() {}
}
