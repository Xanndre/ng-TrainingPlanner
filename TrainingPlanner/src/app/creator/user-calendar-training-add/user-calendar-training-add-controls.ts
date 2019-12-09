import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { UserCalendarTrainingAddForm } from './user-calendar-training-add-form';

export class UserCalendarTrainingAddControls {
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

  initializeControls(form: UserCalendarTrainingAddForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.trainingForm,
            controlType: 'dayPicker',
            formControlName: 'date',
            placeholder: 'Date',
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
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
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
          }
        ],
        class: 'form-row mb-4'
      },
      {
        controls: [
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
