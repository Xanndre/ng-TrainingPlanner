import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { NotificationInfo } from '../models/Notification/NotificationInfo';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private client: HttpClient) {}

  getNotification(userId: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Notification/${userId}`, options)
      .pipe(
        map((res: NotificationInfo) => {
          return res;
        })
      );
  }

  updateNotification(notification: NotificationInfo) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .put('https://localhost:44383/api/Notification', notification, options)
      .pipe(
        map((res: NotificationInfo) => {
          return res;
        })
      );
  }
}
