import { CustomControlGroup } from 'src/app/shared/custom-control-group/custom-control-group';
import { TrainerAddForm } from './trainer-add-form';
import { SportService } from 'src/app/services/Sport.service';

export class TrainerAddControls {
  controlGroups: CustomControlGroup[];
  sports: string[] = [];

  constructor(private sportService: SportService) {}

  initializeControls(form: TrainerAddForm) {
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
        ],
        title: 'Create a trainer account'
      }
    ];
  }
}
