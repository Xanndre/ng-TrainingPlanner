import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/User/User';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { PagedUsers } from '../models/Paged/PagedUsers';
import { PagedPartners } from '../models/Paged/PagedPartners';

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

  updateUser(user: User, isPartner = false) {
    const params = new HttpParams().set('isPartner', isPartner.toString());
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
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

  getLocations(): Observable<string[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get('https://localhost:44383/api/User/locations', options)
      .pipe(
        map((res: string[]) => {
          return res;
        })
      );
  }

  getPartners(
    pageNumber: number,
    pageSize: number,
    userId: string
  ): Observable<PagedPartners> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get(`https://localhost:44383/api/User/partners/${userId}`, options)
      .pipe(
        map((res: PagedPartners) => {
          return res;
        })
      );
  }

  getSignedUpUsers(
    pageNumber: number,
    pageSize: number,
    trainingId: number,
    isSignedUp: boolean
  ): Observable<PagedUsers> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('trainingId', trainingId.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    const url = isSignedUp
      ? 'https://localhost:44383/api/User/signed'
      : 'https://localhost:44383/api/User/notsigned';
    return this.client.get(url, options).pipe(
      map((res: PagedUsers) => {
        return res;
      })
    );
  }
}
