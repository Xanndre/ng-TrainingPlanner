import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chat } from 'src/app/models/Chat/Chat';
import { ChatService } from 'src/app/services/Chat.service';
import { DataTransferService } from 'src/app/services/DataTransfer.service';
import { ChatHubService } from 'src/app/services/ChatHub.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  chats: Chat[] = [];
  currentChat: Chat;
  userId: string;
  isLoaded: true;

  constructor(
    private chatService: ChatService,
    private chatHubService: ChatHubService,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.chatService.getAllChats().subscribe(response => {
      this.chats = response.sort(this.sortChats);
      this.getChatInfo();
      this.isLoaded = true;
    });

    this.chatHubService.addMessageReceivedHandler(this.messageHandler);
    this.chatHubService.addMessageSentHandler(this.messageHandler);
  }

  ngOnDestroy() {
    this.chatHubService.removeMessageReceivedHandler(this.messageHandler);
    this.chatHubService.removeMessageSentHandler(this.messageHandler);
  }

  getChatInfo() {
    const isCreateChat = this.dataTransferService.getIsCreateChat();
    const chatId = this.dataTransferService.getChatId();
    this.dataTransferService.setIsCreateChat(null);
    this.dataTransferService.setChatId(null);
    if (isCreateChat) {
      this.currentChat = this.createEmptyChat();
    } else if (chatId) {
      this.currentChat = this.chats.find(c => c.id === chatId);
    }
  }

  openChat(chat) {
    this.currentChat = chat;
  }

  messageHandler = (message, chatId) => {
    if (!this.chats) {
      this.chats = [];
    }
    const chat = this.chats.find(c => c.id === chatId);
    if (chat) {
      chat.lastMessage = message.sentAt;
      this.chats.splice(this.chats.indexOf(chat), 1);
      this.chats.unshift(chat);
    } else {
      this.chatService.getChatById(chatId).subscribe(response => {
        if (
          response.senderId === this.userId ||
          response.receiverId === this.userId
        ) {
          this.chats.unshift(response);
        }
      });
    }
  };

  sortChats(first, second) {
    return first.lastMessage > second.lastMessage ? -1 : 1;
  }

  createEmptyChat(): Chat {
    return {
      senderId: null,
      receiverId: null,
      id: 0,
      lastMessage: null,
      receiverName: null,
      senderName: null,
      receiverProfilePic: null,
      senderProfilePic: null
    };
  }
}
