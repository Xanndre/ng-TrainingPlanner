import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { UserTraining } from '../models/UserStuff/UserTraining/UserTraining';
import { UserTrainingCreate } from '../models/UserStuff/UserTraining/UserTrainingCreate';
import { Observable } from 'rxjs';
import { PagedUserTrainings } from '../models/Paged/PagedUserTrainings';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingService {
  constructor(private client: HttpClient) {}

  getUserTraining(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/UserTraining/${id}`, options)
      .pipe(
        map((res: UserTraining) => {
          return res;
        })
      );
  }

  createUserTraining(training: UserTrainingCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/UserTraining', training, options)
      .pipe();
  }

  updateUserTraining(training: UserTraining) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/UserTraining', training, options)
      .pipe(
        map((res: UserTraining) => {
          return res;
        })
      );
  }

  deleteUserTraining(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/UserTraining/${id}`, options)
      .pipe();
  }

  getUserTrainings(
    pageNumber: number,
    pageSize: number,
    userId: string
  ): Observable<PagedUserTrainings> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('userId', userId);
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get('https://localhost:44383/api/UserTraining', options)
      .pipe(
        map((res: PagedUserTrainings) => {
          return res;
        })
      );
  }
}
