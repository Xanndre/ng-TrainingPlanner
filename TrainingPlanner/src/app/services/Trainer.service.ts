import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TrainerCreate } from '../models/TrainerCreate';
import { map } from 'rxjs/Operators';
import { TrainerGet } from '../models/TrainerGet';
import { TrainerUpdate } from '../models/TrainerUpdate';
import { Observable } from 'rxjs';
import { PagedTrainers } from '../models/PagedTrainers';

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

  getTrainers(
    pageNumber: number,
    pageSize: number,
    userId: string,
    isFavourite: boolean
  ): Observable<PagedTrainers> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (isFavourite || userId != null) {
      params = params.set('userId', userId);
    }
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    let url = '';
    if (isFavourite) {
      url = 'https://localhost:44383/api/Trainer/favourites';
    } else {
      url = 'https://localhost:44383/api/Trainer';
    }
    return this.client.get(url, options).pipe(
      map((res: PagedTrainers) => {
        return res;
      })
    );
  }
}
