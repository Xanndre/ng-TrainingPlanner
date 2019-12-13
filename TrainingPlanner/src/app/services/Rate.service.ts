import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClubRateCreate } from '../models/ClubStuff/ClubRate/ClubRateCreate';
import { ClubRate } from '../models/ClubStuff/ClubRate/ClubRate';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { PagedClubRates } from '../models/Paged/PagedClubRates';
import { TrainerRateCreate } from '../models/TrainerStuff/TrainerRate/TrainerRateCreate';
import { TrainerRate } from '../models/TrainerStuff/TrainerRate/TrainerRate';
import { PagedTrainerRates } from '../models/Paged/PagedTrainerRates';
import { RateFilterData } from '../models/FilterData/RateFilterData';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  constructor(private client: HttpClient) {}

  createClubRate(rate: ClubRateCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Rate/club', rate, options)
      .pipe();
  }

  updateClubRate(rate: ClubRate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/Rate/club', rate, options)
      .pipe(
        map((res: ClubRate) => {
          return res;
        })
      );
  }

  deleteClubRate(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Rate/club/${id}`, options)
      .pipe();
  }

  getClubRate(userId: string, clubId: number) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('clubId', clubId.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get('https://localhost:44383/api/Rate/club', options)
      .pipe(
        map((res: ClubRate) => {
          return res;
        })
      );
  }

  getClubRates(
    pageNumber: number,
    pageSize: number,
    clubId: number,
    filterData: RateFilterData,
    sortData: string
  ): Observable<PagedClubRates> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('clubId', clubId.toString());
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
    if (sortData != null) {
      params = params.set('sortData', sortData);
    }
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get('https://localhost:44383/api/Rate/club/all', options)
      .pipe(
        map((res: PagedClubRates) => {
          return res;
        })
      );
  }

  createTrainerRate(rate: TrainerRateCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Rate/trainer', rate, options)
      .pipe();
  }

  updateTrainerRate(rate: TrainerRate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/Rate/trainer', rate, options)
      .pipe(
        map((res: TrainerRate) => {
          return res;
        })
      );
  }

  deleteTrainerRate(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Rate/trainer/${id}`, options)
      .pipe();
  }

  getTrainerRate(userId: string, trainerId: number) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('trainerId', trainerId.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get('https://localhost:44383/api/Rate/trainer', options)
      .pipe(
        map((res: TrainerRate) => {
          return res;
        })
      );
  }

  getTrainerRates(
    pageNumber: number,
    pageSize: number,
    trainerId: number,
    filterData: RateFilterData,
    sortData: string
  ): Observable<PagedTrainerRates> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('trainerId', trainerId.toString());
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
    if (sortData != null) {
      params = params.set('sortData', sortData);
    }
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get('https://localhost:44383/api/Rate/trainer/all', options)
      .pipe(
        map((res: PagedTrainerRates) => {
          return res;
        })
      );
  }
}
