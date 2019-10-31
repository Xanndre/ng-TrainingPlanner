import { Injectable } from '@angular/core';
import { ClubCreate } from '../models/Club/ClubCreate';
import { map } from 'rxjs/Operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Club } from '../models/Club/Club';
import { PagedClubs } from '../models/Paged/PagedClubs';
import { Observable } from 'rxjs';
import { ClubUpdate } from '../models/Club/ClubUpdate';

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

  updateClub(club: ClubUpdate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/Club', club, options)
      .pipe(
        map((res: ClubUpdate) => {
          return res;
        })
      );
  }

  deleteClub(clubId: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Club/${clubId}`, options)
      .pipe();
  }

  getClub(id: number, isIncrementingViewCounter = false) {
    const params = new HttpParams().set(
      'isIncrementingViewCounter',
      isIncrementingViewCounter.toString()
    );
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get(`https://localhost:44383/api/Club/${id}`, options)
      .pipe(
        map((res: Club) => {
          return res;
        })
      );
  }

  getClubQuantity(userId: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Club/user/${userId}/quantity`, options)
      .pipe(
        map((res: number) => {
          return res;
        })
      );
  }

  getClubIds(userId: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Club/user/${userId}/ids`, options)
      .pipe(
        map((res: number[]) => {
          return res;
        })
      );
  }

  getClubs(
    pageNumber: number,
    pageSize: number,
    userId: string,
    isUser: boolean,
    isFavourite: boolean
  ): Observable<PagedClubs> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (isUser || isFavourite || userId != null) {
      params = params.set('userId', userId);
    }
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    let url = '';
    if (isUser) {
      url = 'https://localhost:44383/api/Club/user';
    } else if (isFavourite) {
      url = 'https://localhost:44383/api/Club/favourites';
    } else {
      url = 'https://localhost:44383/api/Club';
    }
    return this.client.get(url, options).pipe(
      map((res: PagedClubs) => {
        return res;
      })
    );
  }
}
