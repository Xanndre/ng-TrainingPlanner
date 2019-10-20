import { Injectable } from '@angular/core';
import { ClubCreate } from '../models/ClubCreate';
import { map } from 'rxjs/Operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ClubGet } from '../models/ClubGet';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private client: HttpClient) {}

  createClub(club: ClubCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Club', club, options)
      .pipe();
  }

  getClub(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Club/${id}`, options)
      .pipe(
        map((res: ClubGet) => {
          return res;
        })
      );
  }
}
