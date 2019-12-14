import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { ClubCard } from '../models/ClubStuff/ClubCard/ClubCard';
import { ClubCardCreate } from '../models/ClubStuff/ClubCard/ClubCardCreate';
import { ClubCardUpdate } from '../models/ClubStuff/ClubCard/ClubCardUpdate';
import { Observable } from 'rxjs';
import { PagedClubCards } from '../models/Paged/PagedClubCards';
import { TrainerCard } from '../models/TrainerStuff/TrainerCard/TrainerCard';
import { TrainerCardCreate } from '../models/TrainerStuff/TrainerCard/TrainerCardCreate';
import { TrainerCardUpdate } from '../models/TrainerStuff/TrainerCard/TrainerCardUpdate';
import { PagedTrainerCards } from '../models/Paged/PagedTrainerCards';
import { CardFilterData } from '../models/FilterData/CardFilterData';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private client: HttpClient) {}

  getClubCard(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Card/club/${id}`, options)
      .pipe(
        map((res: ClubCard) => {
          return res;
        })
      );
  }

  createClubCard(card: ClubCardCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Card/club', card, options)
      .pipe();
  }

  updateClubCard(card: ClubCardUpdate, isDeactivating = false) {
    const params = new HttpParams().set(
      'isDeactivating',
      isDeactivating.toString()
    );
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .put('https://localhost:44383/api/Card/club', card, options)
      .pipe(
        map((res: ClubCardUpdate) => {
          return res;
        })
      );
  }

  deleteClubCard(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Card/club/${id}`, options)
      .pipe();
  }

  getClubCards(
    pageNumber: number,
    pageSize: number,
    userId: string,
    clubId: number,
    filterData: CardFilterData
  ): Observable<PagedClubCards> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (userId != null) {
      params = params.set('userId', userId);
    }
    if (clubId != null) {
      params = params.set('clubId', clubId.toString());
    }
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
    if (userId != null && clubId != null) {
      url = 'https://localhost:44383/api/Card/club';
    } else if (userId != null && clubId == null) {
      url = 'https://localhost:44383/api/Card/club/user';
    } else {
      url = 'https://localhost:44383/api/Card/club/club';
    }
    return this.client.get(url, options).pipe(
      map((res: PagedClubCards) => {
        return res;
      })
    );
  }

  getTrainerCard(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Card/trainer/${id}`, options)
      .pipe(
        map((res: TrainerCard) => {
          return res;
        })
      );
  }

  createTrainerCard(card: TrainerCardCreate) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Card/trainer', card, options)
      .pipe();
  }

  updateTrainerCard(card: TrainerCardUpdate, isDeactivating = false) {
    const params = new HttpParams().set(
      'isDeactivating',
      isDeactivating.toString()
    );
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .put('https://localhost:44383/api/Card/trainer', card, options)
      .pipe(
        map((res: TrainerCardUpdate) => {
          return res;
        })
      );
  }

  deleteTrainerCard(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Card/trainer/${id}`, options)
      .pipe();
  }

  getTrainerCards(
    pageNumber: number,
    pageSize: number,
    userId: string,
    trainerId: number,
    filterData: CardFilterData
  ): Observable<PagedTrainerCards> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (userId != null) {
      params = params.set('userId', userId);
    }
    if (trainerId != null) {
      params = params.set('trainerId', trainerId.toString());
    }
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
    if (userId != null && trainerId != null) {
      url = 'https://localhost:44383/api/Card/trainer';
    } else if (userId != null && trainerId == null) {
      url = 'https://localhost:44383/api/Card/trainer/user';
    } else {
      url = 'https://localhost:44383/api/Card/trainer/trainer';
    }
    return this.client.get(url, options).pipe(
      map((res: PagedTrainerCards) => {
        return res;
      })
    );
  }

  getClubCardNames(id: number): Observable<string[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Card/club/${id}/names`, options)
      .pipe(
        map((res: string[]) => {
          return res;
        })
      );
  }

  getTrainerCardNames(id: number): Observable<string[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Card/trainer/${id}/names`, options)
      .pipe(
        map((res: string[]) => {
          return res;
        })
      );
  }
}
