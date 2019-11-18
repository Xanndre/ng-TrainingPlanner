import { Component, OnInit } from '@angular/core';
import { TrainingAddForm } from './training-add-form';
import { TrainingAddControls } from './training-add-controls';
import { FormBuilder } from '@angular/forms';
import { Training } from 'src/app/models/Training/Training';
import { ActivatedRoute } from '@angular/router';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-training-add',
  templateUrl: './training-add.component.html',
  styleUrls: ['./training-add.component.css']
})
export class TrainingAddComponent implements OnInit {
  trainingForm: TrainingAddForm = new TrainingAddForm();
  formControls: TrainingAddControls;

  training: Training = null;
  trainerId: number;

  isEdit = false;
  isLoaded: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data.edit) {
      this.isEdit = true;
    }
    this.formControls = new TrainingAddControls();
    this.trainingForm.buildForm(this.formBuilder, this.training);
    this.formControls.initializeControls(this.trainingForm);
    this.isLoaded = true;
  }

  createTraining() {
    console.log(this.trainingForm.trainingForm.value.primaryColor);
  }

  editTraining() {}
}
