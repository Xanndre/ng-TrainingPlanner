import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private client: HttpClient) {}

  getUser(userId: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/User/${userId}`, options)
      .pipe(
        map((res: User) => {
          return res;
        })
      );
  }

  getAllUsers(): Observable<User[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client.get('https://localhost:44383/api/User', options).pipe(
      map((res: User[]) => {
        return res;
      })
    );
  }

  updateUser(user: User) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/User', user, options)
      .pipe(
        map((res: User) => {
          return res;
        })
      );
  }
}
