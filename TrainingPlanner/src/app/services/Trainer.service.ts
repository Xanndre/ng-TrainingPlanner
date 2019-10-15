import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrainerCreate } from '../models/TrainerCreate';
import { map } from 'rxjs/Operators';
import { Trainer } from '../models/Trainer';
import { TrainerGet } from '../models/TrainerGet';

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

  updateTrainer(trainer: Trainer) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/Trainer', trainer, options)
      .pipe(
        map((res: Trainer) => {
          return res;
        })
      );
  }
}
