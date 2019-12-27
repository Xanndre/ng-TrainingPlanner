import { Injectable } from '@angular/core';
import { ChatCreate } from '../models/Chat/ChatCreate';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private isDeleteActivity: boolean;
  private isDeleteTrainer: boolean;
  private isDeleteExercise: boolean;
  private isCreateChat: boolean;
  private chatId: number;
  private chat: ChatCreate;

  constructor() {}

  getChat(): ChatCreate {
    return this.chat;
  }

  setChat(chat: ChatCreate) {
    this.chat = chat;
  }

  getChatId(): number {
    return this.chatId;
  }

  setChatId(chatId: number) {
    this.chatId = chatId;
  }

  getIsDeleteActivity(): boolean {
    return this.isDeleteActivity;
  }

  setIsDeleteActivity(isDeleteActivity: boolean) {
    this.isDeleteActivity = isDeleteActivity;
  }

  getIsDeleteTrainer(): boolean {
    return this.isDeleteTrainer;
  }

  setIsDeleteTrainer(isDeleteTrainer: boolean) {
    this.isDeleteTrainer = isDeleteTrainer;
  }

  getIsDeleteExercise(): boolean {
    return this.isDeleteExercise;
  }

  setIsDeleteExercise(isDeleteExercise: boolean) {
    this.isDeleteExercise = isDeleteExercise;
  }

  getIsCreateChat(): boolean {
    return this.isCreateChat;
  }

  setIsCreateChat(isCreateChat: boolean) {
    this.isCreateChat = isCreateChat;
  }
}
