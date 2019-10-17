import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrainerCreate } from '../models/TrainerCreate';
import { map } from 'rxjs/Operators';
import { TrainerGet } from '../models/TrainerGet';
import { TrainerUpdate } from '../models/TrainerUpdate';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  constructor(private client: HttpClient) {}

  createTrainer(trainer: TrainerCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Trainer', trainer, options)
      .pipe();
  }

  getTrainerByUser(userId: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Trainer/user/${userId}`, options)
      .pipe(
        map((res: TrainerGet) => {
          return res;
        })
      );
  }

  updateTrainer(trainer: TrainerUpdate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/Trainer', trainer, options)
      .pipe(
        map((res: TrainerUpdate) => {
          return res;
        })
      );
  }

  deleteTrainer(trainerId: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Trainer/${trainerId}`, options)
      .pipe();
  }

  getAllTrainers() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client.get('https://localhost:44383/api/Trainer', options).pipe(
      map((res: TrainerGet[]) => {
        return res;
      })
    );
  }

  getTrainer(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Trainer/${id}`, options)
      .pipe(
        map((res: TrainerGet) => {
          return res;
        })
      );
  }
}
