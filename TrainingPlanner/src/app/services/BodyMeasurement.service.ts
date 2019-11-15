import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { BodyMeasurement } from '../models/BodyMeasurement/BodyMeasurement';
import { BodyMeasurementCreate } from '../models/BodyMeasurement/BodyMeasurementCreate';
import { Observable } from 'rxjs';
import { PagedBodyMeasurements } from '../models/Paged/PagedBodyMeasurements';

@Injectable({
  providedIn: 'root'
})
export class BodyMeasurementService {
  constructor(private client: HttpClient) {}

  getBodyMeasurement(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/BodyMeasurement/${id}`, options)
      .pipe(
        map((res: BodyMeasurement) => {
          return res;
        })
      );
  }

  createBodyMeasurement(measurement: BodyMeasurementCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/BodyMeasurement', measurement, options)
      .pipe();
  }

  updateBodyMeasurement(measurement: BodyMeasurement) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/BodyMeasurement', measurement, options)
      .pipe(
        map((res: BodyMeasurement) => {
          return res;
        })
      );
  }

  deleteBodyMeasurement(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/BodyMeasurement/${id}`, options)
      .pipe();
  }

  getBodyMeasurements(
    pageNumber: number,
    pageSize: number,
    userId: string
  ): Observable<PagedBodyMeasurements> {
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
      .get('https://localhost:44383/api/BodyMeasurement', options)
      .pipe(
        map((res: PagedBodyMeasurements) => {
          return res;
        })
      );
  }
}
