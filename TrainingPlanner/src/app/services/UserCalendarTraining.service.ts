import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCalendarTrainingCreate } from '../models/UserStuff/UserCalendarTraining/UserCalendarTrainingCreate';
import { UserCalendarTrainingUpdate } from '../models/UserStuff/UserCalendarTraining/UserCalendarTrainingUpdate';
import { map } from 'rxjs/Operators';
import { UserCalendarTraining } from '../models/UserStuff/UserCalendarTraining/UserCalendarTraining';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCalendarTrainingService {
  constructor(private client: HttpClient) {}

  createUserCalendarTraining(training: UserCalendarTrainingCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post(
        'https://localhost:44383/api/UserCalendarTraining',
        training,
        options
      )
      .pipe();
  }

  updateUserCalendarTraining(training: UserCalendarTrainingUpdate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put(
        'https://localhost:44383/api/UserCalendarTraining',
        training,
        options
      )
      .pipe(
        map((res: UserCalendarTrainingUpdate) => {
          return res;
        })
      );
  }

  deleteUserCalendarTraining(trainingId: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(
        `https://localhost:44383/api/UserCalendarTraining/${trainingId}`,
        options
      )
      .pipe();
  }

  getUserCalendarTraining(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/UserCalendarTraining/${id}`, options)
      .pipe(
        map((res: UserCalendarTraining) => {
          return res;
        })
      );
  }

  getUserCalendarTrainings(userId: string): Observable<UserCalendarTraining[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(
        `https://localhost:44383/api/UserCalendarTraining/user/${userId}`,
        options
      )
      .pipe(
        map((res: UserCalendarTraining[]) => {
          return res;
        })
      );
  }

  createUserCalendarTrainingRange(trainings: UserCalendarTrainingCreate[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post(
        'https://localhost:44383/api/UserCalendarTraining/range',
        trainings,
        options
      )
      .pipe();
  }
}
