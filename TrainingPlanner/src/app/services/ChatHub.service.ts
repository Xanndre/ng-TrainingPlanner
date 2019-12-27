import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState
} from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  private hubConnection: HubConnection;
  constructor() {}

  initHubConnection() {
    const builder = new HubConnectionBuilder();

    this.hubConnection = builder
      .withUrl('https://localhost:44383/chat', {
        accessTokenFactory: () => localStorage.getItem('jwt')
      })
      .build();

    this.hubConnection.start().then(() => console.log('Connection started!'));
  }

  addMessageReceivedHandler(
    onMessageReceived: (message, chatId, userId) => any
  ) {
    this.hubConnection.on('messageReceived', onMessageReceived);
  }

  addMessageSentHandler(onMessageSent: (message, chatId) => any) {
    this.hubConnection.on('messageSent', onMessageSent);
  }

  removeMessageReceivedHandler(
    onMessageReceived: (message, chatId, userId) => any
  ) {
    this.hubConnection.off('messageReceived', onMessageReceived);
  }

  removeMessageSentHandler(onMessageSent: (message, chatId) => any) {
    this.hubConnection.off('messageSent', onMessageSent);
  }

  sendMessage(message, senderId, chatId, receiverId) {
    this.hubConnection
      .invoke('SendMessage', {
        content: message,
        senderId,
        chatId,
        receiverId
      })
      .catch(error => console.log(error));
  }

  isConnected() {
    return (
      this.hubConnection &&
      this.hubConnection.state === HubConnectionState.Connected
    );
  }

  closeHubConnection() {
    if (this.isConnected()) {
      this.hubConnection.stop().then(() => console.log('Connection stopped!'));
    }
  }
}
