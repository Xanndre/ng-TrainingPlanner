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
  isChatOpen: boolean;

  isLoaded: true;

  constructor(
    private chatService: ChatService,
    private chatHubService: ChatHubService,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit() {
    this.chatService.getAllChats().subscribe(res => {
      this.chats = res.sort(this.sortByDate);
      this.fetchDataTransferData();
      this.isLoaded = true;
    });

    this.chatHubService.addMessageReceivedHandler(this.messageHandler);
    this.chatHubService.addMessageSentHandler(this.messageHandler);
  }

  ngOnDestroy() {
    this.chatHubService.removeMessageReceivedHandler(this.messageHandler);
    this.chatHubService.removeMessageSentHandler(this.messageHandler);
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  fetchDataTransferData() {
    const isCreateChat = this.dataTransferService.getIsCreateChat();
    const chatId = this.dataTransferService.getChatId();
    this.dataTransferService.setIsCreateChat(null);
    this.dataTransferService.setChatId(null);
    if (isCreateChat) {
      this.currentChat = this.createEmptyChat();
      this.isChatOpen = true;
    } else if (chatId) {
      this.currentChat = this.chats.find(c => c.id === chatId);
      this.isChatOpen = true;
    }
  }

  changeChat() {
    this.currentChat = null;
    this.chatService.getAllChats().subscribe(res => {
      this.chats = res.sort(this.sortByDate);
    });
  }

  openChat(chat) {
    this.currentChat = chat;
    this.toggleChat();
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
      this.chatService.getChatById(chatId).subscribe(res => {
        if (res.senderId === this.userId || res.receiverId === this.userId) {
          this.chats.unshift(res);
        }
      });
    }
  };

  sortByDate(one, two) {
    return one.lastMessage > two.lastMessage ? -1 : 1;
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
