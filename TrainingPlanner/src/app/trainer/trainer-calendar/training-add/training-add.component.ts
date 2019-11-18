import { Component, OnInit } from '@angular/core';
import { TrainingAddForm } from './training-add-form';
import { TrainingAddControls } from './training-add-controls';
import { FormBuilder } from '@angular/forms';
import { Training } from 'src/app/models/Training/Training';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingCreate } from 'src/app/models/Training/TrainingCreate';
import { TrainerService } from 'src/app/services/Trainer.service';
import { TrainingService } from 'src/app/services/Training.service';

@Component({
  selector: 'app-training-add',
  templateUrl: './training-add.component.html',
  styleUrls: ['./training-add.component.css']
})
export class TrainingAddComponent implements OnInit {
  trainingForm: TrainingAddForm = new TrainingAddForm();
  formControls: TrainingAddControls;

  training: Training = null;
  trainingCreate: TrainingCreate;
  trainerId: number;
  trainerName: string;

  isEdit = false;
  isLoaded: boolean;
  isTrainerLoaded: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.trainerId = parseInt(
      this.route.snapshot.paramMap.get('trainerId'),
      10
    );
    this.getTrainer();
    if (this.route.snapshot.data.edit) {
      this.isEdit = true;
    }
    this.formControls = new TrainingAddControls();
    this.trainingForm.buildForm(this.formBuilder, this.training);
    this.formControls.initializeControls(this.trainingForm);
  }

  createTraining() {
    const dateStart = new Date(this.trainingForm.trainingForm.value.startDate);
    const dateEnd = new Date(this.trainingForm.trainingForm.value.endDate);
    const start = this.getDate(
      this.trainingForm.trainingForm.value.startTime,
      dateStart
    );
    const end = this.getDate(
      this.trainingForm.trainingForm.value.endTime,
      dateEnd
    );
    this.trainingCreate = {
      title: this.trainingForm.trainingForm.value.title,
      room: this.trainingForm.trainingForm.value.room,
      entries: this.trainingForm.trainingForm.value.entries,
      level: this.trainingForm.trainingForm.value.level,
      entriesLeft: this.trainingForm.trainingForm.value.entries,
      primaryColor: this.trainingForm.trainingForm.value.primaryColor,
      secondaryColor: this.trainingForm.trainingForm.value.secondaryColor,
      clubId: null,
      startDate: start,
      endDate: end,
      trainerId: this.trainerId,
      trainerName: this.trainerName
    };

    this.trainingService.createTraining(this.trainingCreate).subscribe(() => {
      this.router.navigate([`/profile/trainers/${this.trainerId}/calendar`]);
    });
  }

  editTraining() {}

  getDate(time: string, date: Date) {
    const split = time.split(':', 2);
    let hour = parseInt(split[0], 10);
    const rest = split[1].split(' ', 2);
    const min = parseInt(rest[0], 10);
    const ampm = rest[1];
    if (ampm === 'PM') {
      hour += 12;
    }
    date.setHours(hour, min);
    return date;
  }

  getTrainer() {
    this.trainerService.getTrainer(this.trainerId).subscribe(response => {
      this.trainerName = response.user.firstName + ' ' + response.user.lastName;
      this.isTrainerLoaded = true;
    });
  }
}
