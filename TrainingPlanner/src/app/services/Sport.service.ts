import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { Sport } from '../models/Stuff/Sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  constructor(private client: HttpClient) {}

  getAllSports(): Observable<Sport[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client.get('https://localhost:44383/api/Sport', options).pipe(
      map((res: Sport[]) => {
        return res;
      })
    );
  }

  getSportsByNames(sportNames: string[]): Observable<Sport[]> {
    const params = new HttpParams().set('sportNames', sportNames.join(', '));
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get('https://localhost:44383/api/Sport/names', options)
      .pipe(
        map((res: Sport[]) => {
          return res;
        })
      );
  }
}
