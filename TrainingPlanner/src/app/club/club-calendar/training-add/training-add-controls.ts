import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { TrainingAddForm } from './training-add-form';

export class TrainingAddControls {
  controlGroups: CustomControlGroup[];

  theme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#fff',
      buttonColor: '#3f51b5'
    },
    dial: {
      dialBackgroundColor: '#3f51b5'
    },
    clockFace: {
      clockFaceBackgroundColor: '#f0f0f0',
      clockHandColor: '#3f51b5',
      clockFaceTimeInactiveColor: '#6c6c6c'
    }
  };

  trainers: string[] = [];

  initializeControls(form: TrainingAddForm, trainers: string[]) {
    this.trainers = trainers;
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'title',
            placeholder: 'Title',
            class: 'col'
          }
        ],
        class: 'form-row my-4'
      },
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'input',
            type: 'number',
            formControlName: 'entries',
            placeholder: 'Entries',
            class: 'col'
          },
          {
            formGroup: form.trainingForm,
            controlType: 'select',
            formControlName: 'trainer',
            placeholder: 'Trainer',
            values: this.trainers,
            label: 'Trainer',
            class: 'col'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'room',
            placeholder: 'Room',
            class: 'col'
          },
          {
            formGroup: form.trainingForm,
            controlType: 'select',
            formControlName: 'level',
            placeholder: 'Level',
            values: ['Beginner', 'Intermediate', 'Advanced', 'All'],
            label: 'Level',
            class: 'col'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'dayPicker',
            formControlName: 'startDate',
            placeholder: 'Start date',
            class: 'col'
          },
          {
            formGroup: form.trainingForm,
            controlType: 'dayPicker',
            formControlName: 'endDate',
            placeholder: 'End date',
            class: 'col'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'timePicker',
            formControlName: 'startTime',
            placeholder: 'Start time',
            theme: this.theme,
            class: 'col'
          },
          {
            formGroup: form.trainingForm,
            controlType: 'timePicker',
            formControlName: 'endTime',
            placeholder: 'End time',
            theme: this.theme,
            class: 'col'
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'colorPicker',
            formControlName: 'primaryColor',
            placeholder: 'Primary color',
            class: 'col'
          },
          {
            formGroup: form.trainingForm,
            controlType: 'colorPicker',
            formControlName: 'secondaryColor',
            placeholder: 'Secondary color',
            class: 'col'
          }
        ],
        class: 'form-row mb-4'
      }
    ];
  }
}
