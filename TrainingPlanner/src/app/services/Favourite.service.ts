import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FavouriteClub } from '../models/Favourite/FavouriteClub';
import { FavouriteTrainer } from '../models/Favourite/FavouriteTrainer';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(private client: HttpClient) {}

  deleteFavouriteClub(clubId: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(`https://localhost:44383/api/Favourite/club/${clubId}`, options)
      .pipe();
  }

  createFavouriteClub(favourite: FavouriteClub) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Favourite/club', favourite, options)
      .pipe();
  }

  deleteFavouriteTrainer(trainerId: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .delete(
        `https://localhost:44383/api/Favourite/trainer/${trainerId}`,
        options
      )
      .pipe();
  }

  createFavouriteTrainer(favourite: FavouriteTrainer) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Favourite/trainer', favourite, options)
      .pipe();
  }
}
