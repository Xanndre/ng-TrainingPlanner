import { Injectable } from '@angular/core';
import { ClubCreate } from '../models/Club/ClubCreate';
import { map } from 'rxjs/Operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Club } from '../models/Club/Club';
import { PagedClubs } from '../models/Paged/PagedClubs';
import { Observable } from 'rxjs';
import { ClubUpdate } from '../models/Club/ClubUpdate';
import { ClubFilterData } from '../models/FilterData/ClubFilterData';

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
    filterData: ClubFilterData,
    isUser: boolean,
    isFavourite: boolean
  ): Observable<PagedClubs> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('userId', userId);
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

  getClubTrainerNames(clubId: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Club/${clubId}/trainers`, options)
      .pipe(
        map((res: string[]) => {
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
      .get('https://localhost:44383/api/Club/locations', options)
      .pipe(
        map((res: string[]) => {
          return res;
        })
      );
  }
}
