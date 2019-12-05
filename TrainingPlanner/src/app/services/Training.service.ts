import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrainingCreate } from '../models/Training/TrainingCreate';
import { Training } from '../models/Training/Training';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { TrainingUpdate } from '../models/Training/TrainingUpdate';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(private client: HttpClient) {}

  createTraining(training: TrainingCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Training', training, options)
      .pipe();
  }

  updateTraining(training: TrainingUpdate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/Training', training, options)
      .pipe(
        map((res: TrainingUpdate) => {
          return res;
        })
      );
  }

  deleteTraining(trainingId: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Training/${trainingId}`, options)
      .pipe();
  }

  getTraining(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Training/${id}`, options)
      .pipe(
        map((res: Training) => {
          return res;
        })
      );
  }

  getTrainerTrainings(trainerId: number): Observable<Training[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Training/trainer/${trainerId}`, options)
      .pipe(
        map((res: Training[]) => {
          return res;
        })
      );
  }

  getClubTrainings(clubId: number): Observable<Training[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Training/club/${clubId}`, options)
      .pipe(
        map((res: Training[]) => {
          return res;
        })
      );
  }

  getReservedTrainings(userId: string): Observable<Training[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Training/user/${userId}`, options)
      .pipe(
        map((res: Training[]) => {
          return res;
        })
      );
  }

  createTrainingRange(trainings: TrainingCreate[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Training/range', trainings, options)
      .pipe();
  }
}
