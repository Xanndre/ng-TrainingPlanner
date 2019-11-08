import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/User/User';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { PagedUsers } from '../models/Paged/PagedUsers';

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

  deleteUser(userId: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/User/${userId}`, options)
      .pipe();
  }

  getUsers(pageNumber: number, pageSize: number): Observable<PagedUsers> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client.get('https://localhost:44383/api/User', options).pipe(
      map((res: PagedUsers) => {
        return res;
      })
    );
  }
}
