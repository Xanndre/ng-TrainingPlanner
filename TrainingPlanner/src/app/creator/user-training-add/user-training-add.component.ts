import { Component, OnInit } from '@angular/core';
import { UserTrainingAddForm } from './user-training-add-form';
import { UserTrainingAddControls } from './user-training-add-controls';
import { UserTraining } from 'src/app/models/UserStuff/UserTraining/UserTraining';
import { UserTrainingCreate } from 'src/app/models/UserStuff/UserTraining/UserTrainingCreate';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Exercise } from 'src/app/models/UserStuff/UserTraining/Exercise';
import { UserTrainingService } from 'src/app/services/UserTraining.service';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseDialogComponent } from 'src/app/shared/exercise-dialog/exercise-dialog.component';
import { DataTransferService } from 'src/app/services/DataTransfer.service';

@Component({
  selector: 'app-user-training-add',
  templateUrl: './user-training-add.component.html',
  styleUrls: ['./user-training-add.component.css']
})
export class UserTrainingAddComponent implements OnInit {
  trainingForm: UserTrainingAddForm = new UserTrainingAddForm();
  formControls: UserTrainingAddControls;

  isLoaded: boolean;
  isEdit = false;
  isEdited: boolean;

  training: UserTraining = null;
  trainingCreate: UserTrainingCreate;
  trainingId = null;

  exercises: Exercise[] = [];

  beforeChanges: UserTraining;
  counter = 0;
  userId: string;
  trainingUpdate: UserTraining = new UserTraining();

  pageNumber = 1;
  pageSize = 3;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userTrainingService: UserTrainingService,
    private dataTransferService: DataTransferService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data.edit) {
      this.isEdit = true;
      this.trainingId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.userTrainingService
        .getUserTraining(this.trainingId)
        .subscribe(response => {
          this.training = response;
          this.beforeChanges = JSON.parse(JSON.stringify(this.training));
          this.formControls = new UserTrainingAddControls();
          this.trainingForm.buildForm(this.formBuilder, this.training);
          this.formControls.initializeControls(this.trainingForm);
          this.trainingForm.trainingForm.disable();
          this.exercises = response.exercises;
          this.isLoaded = true;
        });
    } else {
      this.userId = localStorage.getItem('userId');
      this.formControls = new UserTrainingAddControls();
      this.trainingForm.buildForm(this.formBuilder, this.training);
      this.formControls.initializeControls(this.trainingForm);
      this.isLoaded = true;
    }
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  editTraining() {
    this.isEdited = true;
    this.setEditedData();
    this.trainingForm.trainingForm.enable();
  }

  setEditedData() {
    this.trainingUpdate.name = this.trainingForm.trainingForm.value.title;
    this.trainingUpdate.type = this.trainingForm.trainingForm.value.type;
    this.trainingUpdate.userId = this.userId;
    this.trainingUpdate.id = this.training.id;
  }

  cancel() {
    this.isEdited = false;
    this.trainingUpdate = JSON.parse(JSON.stringify(this.beforeChanges));
    this.setTrainingData();
    this.trainingForm.trainingForm.markAsPristine();
    this.trainingForm.trainingForm.markAsUntouched();
    this.trainingForm.trainingForm.updateValueAndValidity();
    this.trainingForm.trainingForm.disable();
  }

  setTrainingData() {
    this.trainingForm.trainingForm.setValue({
      title: this.training.name,
      type: this.training.type
    });
    this.exercises = this.beforeChanges.exercises;
  }

  saveTrainingData() {
    this.isEdited = false;
    this.setEditedData();
    this.trainingUpdate.exercises = this.exercises;

    this.trainingUpdate.exercises.forEach(p => {
      p.userTrainingId = this.trainingUpdate.id;
      p.id = undefined;
    });

    this.userTrainingService.updateUserTraining(this.trainingUpdate).subscribe(
      () => {},
      () => {
        this.showError('Invalid training edition attempt.');
      }
    );
    this.beforeChanges = JSON.parse(JSON.stringify(this.training));
    this.trainingForm.trainingForm.disable();
  }

  createTraining() {
    this.exercises.forEach(el => (el.id = undefined));

    this.trainingCreate = {
      userId: localStorage.getItem('userId'),
      name: this.trainingForm.trainingForm.value.title,
      type: this.trainingForm.trainingForm.value.type,
      picture: '',
      exercises: this.exercises
    };
    this.userTrainingService.createUserTraining(this.trainingCreate).subscribe(
      () => {
        this.router.navigate(['training_creator']);
      },
      () => {
        this.showError('Invalid training creation attempt.');
      }
    );
  }

  openExerciseDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ExerciseDialogComponent, {
      width: '268px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Add') {
          this.addExercise(result.data);
        } else if (result.event === 'Edit') {
          this.editExercise(result.data);
        } else if (result.event === 'Delete') {
          this.deleteExercise(result.data);
        }
      }
    });
  }

  deleteExercise(rowObj: Exercise) {
    const temp = this.exercises.find(value => value.name === rowObj.name);
    if (temp === this.exercises[this.exercises.length - 1]) {
      this.dataTransferService.setIsDeleteExercise(true);
    }
    this.exercises = this.exercises.filter(value => {
      return value.name !== rowObj.name;
    });
  }

  addExercise(rowObj: Exercise) {
    this.exercises.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      userTrainingId: 0,
      name: rowObj.name,
      series: rowObj.series,
      repetitions: rowObj.repetitions,
      duration: rowObj.duration,
      isTimeRelated: rowObj.isTimeRelated
    });
  }

  editExercise(rowObj: Exercise) {
    this.exercises = this.exercises.filter(value => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
        (value.duration = rowObj.duration),
          (value.series = rowObj.series),
          (value.isTimeRelated = rowObj.isTimeRelated),
          (value.repetitions = rowObj.repetitions);
      }
      return true;
    });
  }
}
