import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { SportService } from 'src/app/services/Sport.service';
import { TrainerProfileForm } from './trainer-profile-form';

export class TrainerProfileControls {
  controlGroups: CustomControlGroup[];
  sports: string[] = [];

  constructor(private sportService: SportService) {}

  initializeControls(form: TrainerProfileForm) {
    this.sportService.getAllSports().subscribe(response => {
      response.forEach(sport => {
        this.sports.push(sport.name);
      });
    });

    this.controlGroups = [
      {
        controls: [
          {
            formGroup: form.trainerForm,
            controlType: 'textarea',
            rows: 10,
            formControlName: 'description',
            placeholder: 'About me',
            label: 'About me'
          },
          {
            formGroup: form.trainerForm,
            controlType: 'select',
            multiple: true,
            formControlName: 'sports',
            placeholder: 'Sports',
            values: this.sports,
            label: 'Sports'
          }
        ]
      }
    ];
  }
}
