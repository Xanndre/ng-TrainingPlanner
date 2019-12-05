import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { TrainingAddRecurrentForm } from './training-add-recurrent-form';

export class TrainingAddRecurrentControls {
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

  initializeControls(form: TrainingAddRecurrentForm) {
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
            controlType: 'input',
            type: 'number',
            formControlName: 'entries',
            placeholder: 'Entries',
            class: 'col'
          },
          {
            formGroup: form.trainingForm,
            controlType: 'select',
            formControlName: 'day',
            placeholder: 'Day',
            values: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
            ],
            label: 'Day',
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
