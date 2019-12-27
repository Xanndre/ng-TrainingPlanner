import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { Chat } from '../models/Chat/Chat';
import { Observable } from 'rxjs';
import { ChatCreate } from '../models/Chat/ChatCreate';
import { PagedMessages } from '../models/Paged/PagedMessages';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private client: HttpClient) {}

  getChat(receiverId: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Chat/partner/${receiverId}`, options)
      .pipe(
        map((res: Chat) => {
          return res;
        })
      );
  }

  getChatById(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .get(`https://localhost:44383/api/Chat/${id}`, options)
      .pipe(
        map((res: Chat) => {
          return res;
        })
      );
  }

  getAllChats(): Observable<Chat[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client.get('https://localhost:44383/api/Chat', options).pipe(
      map((res: Chat[]) => {
        return res;
      })
    );
  }

  createChat(chat: ChatCreate): Observable<Chat> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    };
    return this.client
      .post('https://localhost:44383/api/Chat', chat, options)
      .pipe(
        map((res: Chat) => {
          return res;
        })
      );
  }

  getAllMessages(
    pageNumber: number,
    pageSize: number,
    chatId: number
  ): Observable<PagedMessages> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('chatId', chatId.toString());
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }),
      params
    };
    return this.client
      .get(`https://localhost:44383/api/Chat/${chatId}/messages`, options)
      .pipe(
        map((res: PagedMessages) => {
          return res;
        })
      );
  }
}
