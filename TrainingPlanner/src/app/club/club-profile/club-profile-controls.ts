import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { ClubProfileForm } from './club-profile-form';

export class ClubProfileControls {
  controlGroups: CustomControlGroup[];

  initializeControls(form: ClubProfileForm) {
    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.clubForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'name',
            placeholder: 'Name',
            label: 'Name'
          },
          {
            formGroup: form.clubForm,
            controlType: 'textarea',
            rows: 10,
            formControlName: 'description',
            placeholder: 'About club',
            label: 'About club'
          }
        ]
      },
      {
        controls: [
          {
            formGroup: form.clubForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'streetName',
            placeholder: 'Street name',
            label: 'Street name',
            class: 'col'
          },
          {
            formGroup: form.clubForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'streetNumber',
            placeholder: 'Street number',
            label: 'Street number',
            class: 'col'
          }
        ],
        class: 'row'
      },
      {
        controls: [
          {
            formGroup: form.clubForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'postalCode',
            placeholder: 'Postal code',
            label: 'Postal code',
            class: 'col'
          },
          {
            formGroup: form.clubForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'city',
            placeholder: 'City',
            label: 'City',
            class: 'col'
          }
        ],
        class: 'row'
      },
      {
        controls: [
          {
            formGroup: form.clubForm,
            controlType: 'input',
            type: 'text',
            formControlName: 'phoneNumber',
            placeholder: 'Phone number',
            label: 'Phone number',
            class: 'col'
          },
          {
            formGroup: form.clubForm,
            controlType: 'input',
            type: 'email',
            formControlName: 'email',
            placeholder: 'Email',
            label: 'Email',
            class: 'col'
          }
        ],
        class: 'row'
      }
    ];
  }
}
