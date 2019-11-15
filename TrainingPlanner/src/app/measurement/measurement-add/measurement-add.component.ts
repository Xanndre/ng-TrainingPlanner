import { Component, OnInit } from '@angular/core';
import { MeasurementAddForm } from './measurement-add-form';
import { MeasurementAddControls } from './measurement-add-controls';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-measurement-add',
  templateUrl: './measurement-add.component.html',
  styleUrls: ['./measurement-add.component.css']
})
export class MeasurementAddComponent implements OnInit {
  isInjured: boolean;
  selectedInjury: string;
  injuries: string[] = [
    'Neck',
    'Arm',
    'Armpit',
    'Forearm',
    'Wrist',
    'Hand',
    'Leg',
    'Thigh',
    'Hip',
    'Knee',
    'Shin',
    'Calf',
    'Ankle',
    'Foot',
    'Chest',
    'Stomach',
    'Back',
    'Shoulder',
    'Buttock'
  ];

  bodyForm: MeasurementAddForm = new MeasurementAddForm();
  formControls: MeasurementAddControls = new MeasurementAddControls();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bodyForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.bodyForm);
  }
}
