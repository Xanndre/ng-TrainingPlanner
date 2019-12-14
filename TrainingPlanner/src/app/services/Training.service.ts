import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TrainingCreate } from '../models/Training/TrainingCreate';
import { Training } from '../models/Training/Training';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { TrainingUpdate } from '../models/Training/TrainingUpdate';
import { TrainingFilterData } from '../models/FilterData/TrainingFilterData';

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

  getTrainerTrainings(
    trainerId: number,
    filterData: TrainingFilterData
  ): Observable<Training[]> {
    let params = new HttpParams();
    Object.keys(filterData).forEach(key => {
      if (filterData[key] != null) {
        if (filterData[key] instanceof Date) {
          params = params.set(key, filterData[key].toUTCString());
        } else if (filterData[key] instanceof Array) {
          filterData[key].forEach(el => {
            if (el != null) {
              params = params.append(key, el);
            }
          });
        } else {
          params = params.set(key, filterData[key]);
        }
      }
    });
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get(`https://localhost:44383/api/Training/trainer/${trainerId}`, options)
      .pipe(
        map((res: Training[]) => {
          return res;
        })
      );
  }

  getClubTrainings(
    clubId: number,
    filterData: TrainingFilterData
  ): Observable<Training[]> {
    let params = new HttpParams();
    Object.keys(filterData).forEach(key => {
      if (filterData[key] != null) {
        if (filterData[key] instanceof Date) {
          params = params.set(key, filterData[key].toUTCString());
        } else if (filterData[key] instanceof Array) {
          filterData[key].forEach(el => {
            if (el != null) {
              params = params.append(key, el);
            }
          });
        } else {
          params = params.set(key, filterData[key]);
        }
      }
    });
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get(`https://localhost:44383/api/Training/club/${clubId}`, options)
      .pipe(
        map((res: Training[]) => {
          return res;
        })
      );
  }

  getReservedTrainings(
    userId: string,
    filterData: TrainingFilterData
  ): Observable<Training[]> {
    let params = new HttpParams();
    Object.keys(filterData).forEach(key => {
      if (filterData[key] != null) {
        if (filterData[key] instanceof Date) {
          params = params.set(key, filterData[key].toUTCString());
        } else if (filterData[key] instanceof Array) {
          filterData[key].forEach(el => {
            if (el != null) {
              params = params.append(key, el);
            }
          });
        } else {
          params = params.set(key, filterData[key]);
        }
      }
    });
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
