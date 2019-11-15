import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BodyMeasurement } from 'src/app/models/BodyMeasurement/BodyMeasurement';

export class MeasurementAddForm {
  bodyForm: FormGroup;

  buildForm(formBuilder: FormBuilder, measurement: BodyMeasurement) {
    this.bodyForm = formBuilder.group({
      age: [
        measurement !== null ? measurement.age : null,
        [Validators.required, Validators.min(0), Validators.max(200)]
      ],
      weight: [
        measurement !== null ? measurement.weight : null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      height: [
        measurement !== null ? measurement.height : null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      fat: [
        measurement !== null ? measurement.fat : null,
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      fatMass: [
        measurement !== null ? measurement.fatMass : null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      muscleMass: [
        measurement !== null ? measurement.muscleMass : null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      metabolicAge: [
        measurement !== null ? measurement.metabolicAge : null,
        [Validators.required, Validators.min(0), Validators.max(200)]
      ],
      neck: [
        measurement !== null ? measurement.neck : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      forearm: [
        measurement !== null ? measurement.forearm : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      chest: [
        measurement !== null ? measurement.chest : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      waist: [
        measurement !== null ? measurement.waist : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      thigh: [
        measurement !== null ? measurement.thigh : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      shoulders: [
        measurement !== null ? measurement.shoulders : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      biceps: [
        measurement !== null ? measurement.biceps : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      hips: [
        measurement !== null ? measurement.hips : null,
        [Validators.min(0), Validators.max(1000)]
      ],
      calf: [
        measurement !== null ? measurement.calf : null,
        [Validators.min(0), Validators.max(1000)]
      ]
    });
  }
}
