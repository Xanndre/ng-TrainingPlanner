import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reservation } from '../models/Reservation/Reservation';
import { map } from 'rxjs/Operators';
import { ReservationInfo } from '../models/Reservation/ReservationInfo';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private client: HttpClient) {}

  deleteReservation(trainingId: number, userId: string) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('trainingId', trainingId.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .delete('https://localhost:44383/api/Reservation', options)
      .pipe();
  }

  createReservation(reservation: Reservation) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Reservation', reservation, options)
      .pipe();
  }

  getReservationInfo(userId: string, trainingId: number) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('trainingId', trainingId.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get('https://localhost:44383/api/Reservation', options)
      .pipe(
        map((res: ReservationInfo) => {
          return res;
        })
      );
  }
}
