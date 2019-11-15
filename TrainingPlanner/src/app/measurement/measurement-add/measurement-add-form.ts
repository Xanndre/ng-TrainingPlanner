import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class MeasurementAddForm {
  bodyForm: FormGroup;

  buildForm(formBuilder: FormBuilder) {
    this.bodyForm = formBuilder.group({
      age: [
        null,
        [Validators.required, Validators.min(0), Validators.max(200)]
      ],
      weight: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      height: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      fat: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      fatMass: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      muscleMass: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      metabolicAge: [
        null,
        [Validators.required, Validators.min(0), Validators.max(200)]
      ],
      neck: [null, [Validators.min(0), Validators.max(1000)]],
      forearm: [null, [Validators.min(0), Validators.max(1000)]],
      chest: [null, [Validators.min(0), Validators.max(1000)]],
      waist: [null, [Validators.min(0), Validators.max(1000)]],
      thigh: [null, [Validators.min(0), Validators.max(1000)]],
      shoulders: [null, [Validators.min(0), Validators.max(1000)]],
      biceps: [null, [Validators.min(0), Validators.max(1000)]],
      hips: [null, [Validators.min(0), Validators.max(1000)]],
      calf: [null, [Validators.min(0), Validators.max(1000)]]
    });
  }
}
