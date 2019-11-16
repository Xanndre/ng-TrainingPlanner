import { Component, OnInit } from '@angular/core';
import { MeasurementAddForm } from './measurement-add-form';
import { MeasurementAddControls } from './measurement-add-controls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomControl } from 'src/app/shared/custom-control/custom-control';
import { BodyMeasurementService } from 'src/app/services/BodyMeasurement.service';
import { BodyMeasurement } from 'src/app/models/BodyMeasurement/BodyMeasurement';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMeasurementCreate } from 'src/app/models/BodyMeasurement/BodyMeasurementCreate';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-measurement-add',
  templateUrl: './measurement-add.component.html',
  styleUrls: ['./measurement-add.component.css']
})
export class MeasurementAddComponent implements OnInit {
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

  isInjured: boolean;
  injuriesControl: CustomControl = new CustomControl();
  injuryForm: FormGroup;
  userInjuries: string[] = [];

  measurementId: number;
  userId: string;
  measurement: BodyMeasurement;
  measurementUpdate: BodyMeasurement = new BodyMeasurement();
  beforeChanges: BodyMeasurement;
  isLoaded: boolean;
  isEdit: boolean;
  isEdited = false;

  bodyForm: MeasurementAddForm = new MeasurementAddForm();
  formControls: MeasurementAddControls = new MeasurementAddControls();

  measurementCreate: BodyMeasurementCreate;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private bodyMeasurementService: BodyMeasurementService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.measurementId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.isEdit = this.route.snapshot.data.edit;
    if (this.isEdit) {
      this.bodyMeasurementService
        .getBodyMeasurement(this.measurementId)
        .subscribe(response => {
          this.measurement = response;
          this.isInjured = response.isInjured;
          this.measurement.injuries.forEach(j => {
            this.userInjuries.push(j.injury);
          });
          this.bodyForm.buildForm(this.formBuilder, this.measurement);
          this.formControls.initializeControls(this.bodyForm);

          this.injuryForm = this.formBuilder.group({
            injuries: [
              this.userInjuries ? this.userInjuries : '',
              Validators.required
            ]
          });

          this.initializeInjuryControl();
          this.beforeChanges = JSON.parse(JSON.stringify(this.measurement));
          this.injuryForm.disable();
          this.bodyForm.bodyForm.disable();
          this.isLoaded = true;
        });
    } else {
      this.measurement = null;
      this.bodyForm.buildForm(this.formBuilder, this.measurement);
      this.formControls.initializeControls(this.bodyForm);
      this.injuryForm = this.formBuilder.group({
        injuries: [
          this.userInjuries ? this.userInjuries : '',
          Validators.required
        ]
      });

      this.initializeInjuryControl();
      this.isLoaded = true;
    }
  }

  initializeInjuryControl() {
    this.injuriesControl = {
      formGroup: this.injuryForm,
      controlType: 'select',
      multiple: true,
      formControlName: 'injuries',
      placeholder: 'Injuries',
      values: this.injuries,
      label: 'Injuries'
    };
  }

  addMeasurement() {
    this.measurementCreate = {
      userId: this.userId,
      age: this.bodyForm.bodyForm.value.age,
      muscleMass: this.bodyForm.bodyForm.value.muscleMass,
      weight: this.bodyForm.bodyForm.value.weight,
      height: this.bodyForm.bodyForm.value.height,
      metabolicAge: this.bodyForm.bodyForm.value.metabolicAge,
      fat: this.bodyForm.bodyForm.value.fat,
      fatMass: this.bodyForm.bodyForm.value.fatMass,
      isInjured: this.isInjured !== undefined ? this.isInjured : false,
      injuries: [],
      neck: this.bodyForm.bodyForm.value.neck,
      forearm: this.bodyForm.bodyForm.value.forearm,
      chest: this.bodyForm.bodyForm.value.chest,
      waist: this.bodyForm.bodyForm.value.waist,
      thigh: this.bodyForm.bodyForm.value.thigh,
      shoulders: this.bodyForm.bodyForm.value.shoulders,
      biceps: this.bodyForm.bodyForm.value.biceps,
      hips: this.bodyForm.bodyForm.value.hips,
      calf: this.bodyForm.bodyForm.value.calf
    };
    if (this.isInjured) {
      this.injuryForm.value.injuries.forEach(s => {
        this.measurementCreate.injuries.push({
          bodyMeasurementId: 0,
          injury: s
        });
      });
    }

    this.bodyMeasurementService
      .createBodyMeasurement(this.measurementCreate)
      .subscribe(
        () => {
          this.router.navigate(['/measurements']);
        },
        () => {
          this.showError('Invalid body measurement creation attempt.');
        }
      );
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  editMeasurement() {
    this.isEdited = true;
    this.setEditedData();
    this.bodyForm.bodyForm.enable();
    this.injuryForm.enable();
  }

  setEditedData() {
    this.measurementUpdate.id = this.measurement.id;
    this.measurementUpdate.userId = this.measurement.userId;
    this.measurementUpdate.age = this.bodyForm.bodyForm.value.age;
    this.measurementUpdate.muscleMass = this.bodyForm.bodyForm.value.muscleMass;
    this.measurementUpdate.weight = this.bodyForm.bodyForm.value.weight;
    this.measurementUpdate.height = this.bodyForm.bodyForm.value.height;
    this.measurementUpdate.metabolicAge = this.bodyForm.bodyForm.value.metabolicAge;
    this.measurementUpdate.fat = this.bodyForm.bodyForm.value.fat;
    this.measurementUpdate.fatMass = this.bodyForm.bodyForm.value.fatMass;
    this.measurementUpdate.neck = this.bodyForm.bodyForm.value.neck;
    this.measurementUpdate.forearm = this.bodyForm.bodyForm.value.forearm;
    this.measurementUpdate.chest = this.bodyForm.bodyForm.value.chest;
    this.measurementUpdate.waist = this.bodyForm.bodyForm.value.waist;
    this.measurementUpdate.thigh = this.bodyForm.bodyForm.value.thigh;
    this.measurementUpdate.shoulders = this.bodyForm.bodyForm.value.shoulders;
    this.measurementUpdate.biceps = this.bodyForm.bodyForm.value.biceps;
    this.measurementUpdate.hips = this.bodyForm.bodyForm.value.hips;
    this.measurementUpdate.calf = this.bodyForm.bodyForm.value.calf;
  }

  cancel() {
    this.isEdited = false;
    this.measurementUpdate = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setMeasurementData();
    this.bodyForm.bodyForm.markAsPristine();
    this.bodyForm.bodyForm.markAsUntouched();
    this.bodyForm.bodyForm.updateValueAndValidity();
    this.bodyForm.bodyForm.disable();
    this.injuryForm.markAsPristine();
    this.injuryForm.markAsUntouched();
    this.injuryForm.updateValueAndValidity();
    this.injuryForm.disable();
  }

  saveMeasurementData() {
    this.isEdited = false;
    this.setEditedData();
    this.measurementUpdate.date = this.measurement.date;
    this.measurementUpdate.isInjured = this.isInjured;
    this.measurementUpdate.injuries = [];
    if (this.isInjured) {
      this.injuryForm.value.injuries.forEach(s => {
        this.measurementUpdate.injuries.push({
          bodyMeasurementId: 0,
          injury: s
        });
      });
    }
    this.bodyMeasurementService
      .updateBodyMeasurement(this.measurementUpdate)
      .subscribe(
        () => {},
        () => {
          this.showError('Invalid body measurement edition attempt.');
        }
      );
    this.beforeChanges = JSON.parse(JSON.stringify(this.measurement));
    this.bodyForm.bodyForm.disable();
    this.injuryForm.disable();
  }

  setMeasurementData() {
    const injuries: string[] = [];
    this.beforeChanges.injuries.forEach(s => {
      injuries.push(s.injury);
    });
    this.isInjured = this.beforeChanges.isInjured;
    this.injuryForm.setValue({
      injuries
    });
    this.bodyForm.bodyForm.setValue({
      age: this.measurement.age,
      muscleMass: this.measurement.muscleMass,
      weight: this.measurement.weight,
      height: this.measurement.height,
      metabolicAge: this.measurement.metabolicAge,
      fat: this.measurement.fat,
      fatMass: this.measurement.fatMass,
      neck: this.measurement.neck,
      forearm: this.measurement.forearm,
      chest: this.measurement.chest,
      waist: this.measurement.waist,
      thigh: this.measurement.thigh,
      shoulders: this.measurement.shoulders,
      biceps: this.measurement.biceps,
      hips: this.measurement.hips,
      calf: this.measurement.calf
    });
  }
}
