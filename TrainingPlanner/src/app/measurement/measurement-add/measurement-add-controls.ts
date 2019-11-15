import { MeasurementAddForm } from './measurement-add-form';
import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';

export class MeasurementAddControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: MeasurementAddForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'age',
            placeholder: 'Age',
            class: 'col'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'metabolicAge',
            placeholder: 'Metabolic age',
            class: 'col'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'height',
            placeholder: 'Height',
            class: 'col',
            suffix: 'cm'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'weight',
            placeholder: 'Weight',
            class: 'col',
            suffix: 'kg'
          }
        ],
        title: 'Add new measurement',
        class: 'form-row'
      },
      {
        controls: [
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'fatMass',
            placeholder: 'Fat mass',
            class: 'col',
            suffix: 'kg'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'muscleMass',
            placeholder: 'Muscle mass',
            class: 'col',
            suffix: 'kg'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'fat',
            placeholder: 'Fat',
            class: 'col',
            suffix: '%'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'neck',
            placeholder: 'Neck',
            class: 'col',
            suffix: 'cm'
          }
        ],
        class: 'form-row'
      },
      {
        controls: [
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'forearm',
            placeholder: 'Forearm',
            class: 'col',
            suffix: 'cm'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'chest',
            placeholder: 'Chest',
            class: 'col',
            suffix: 'cm'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'waist',
            placeholder: 'Waist',
            class: 'col',
            suffix: 'cm'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'thigh',
            placeholder: 'Thigh',
            class: 'col',
            suffix: 'cm'
          }
        ],
        class: 'form-row'
      },
      {
        controls: [
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'shoulders',
            placeholder: 'Shoulders',
            class: 'col',
            suffix: 'cm'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'biceps',
            placeholder: 'Biceps',
            class: 'col',
            suffix: 'cm'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'hips',
            placeholder: 'Hips',
            class: 'col',
            suffix: 'cm'
          },
          {
            formGroup: form.bodyForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'calf',
            placeholder: 'Calf',
            class: 'col',
            suffix: 'cm'
          }
        ],
        class: 'form-row mb-4'
      }
    ];
  }
}
