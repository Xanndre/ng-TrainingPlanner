import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  Input,
  SimpleChanges
} from '@angular/core';
import { Chat } from 'src/app/models/Chat/Chat';
import { PagedMessages } from 'src/app/models/Paged/PagedMessages';
import { Message } from 'src/app/models/Chat/Message';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatService } from 'src/app/services/Chat.service';
import { ChatHubService } from 'src/app/services/ChatHub.service';
import { ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ChatCreate } from 'src/app/models/Chat/ChatCreate';
import { DataTransferService } from 'src/app/services/DataTransfer.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() get chat(): Chat {
    return this.chatValue;
  }
  set chat(val) {
    this.chatValue = val;
  }
  userId: string;
  pageSize = 7;
  chatValue: Chat;
  isScrollingAllowed: boolean;
  pagedMessages: PagedMessages;
  currentPageNumber = 1;
  currentMessages: Message[] = [];
  newMessage = '';
  loadingNewMessages: boolean;
  isCreatingChat: boolean;
  chatCreate: ChatCreate;
  @ViewChild('messages', { static: false })
  messagesContainer: ElementRef;
  @ViewChildren(ChatMessageComponent)
  messages: QueryList<ChatMessageComponent>;

  constructor(
    private chatService: ChatService,
    private chatHubService: ChatHubService,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.chatHubService.addMessageReceivedHandler(this.messageHandler);
    this.chatHubService.addMessageSentHandler(this.messageHandler);
  }

  ngOnDestroy() {
    this.chatHubService.removeMessageReceivedHandler(this.messageHandler);
    this.chatHubService.removeMessageSentHandler(this.messageHandler);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreatingChat) {
      this.loadChat();
    }
    this.isCreatingChat = false;
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(() => this.scrollToBottom());
  }

  messageHandler = (message, chatId) => {
    if (this.chat.id === chatId) {
      this.currentMessages.unshift(message);
      this.isScrollingAllowed = true;
    }
  };

  loadChat() {
    this.currentMessages = [];
    this.isScrollingAllowed = true;
    this.pagedMessages = null;
    this.currentPageNumber = 1;
    if (this.chat.id !== 0) {
      this.loadMessages(1);
    } else {
      this.chatCreate = this.dataTransferService.getChat();
      this.dataTransferService.setChat(null);
    }
  }

  loadMessages(pageNumber: number) {
    if (
      !this.loadingNewMessages &&
      (pageNumber === 1 || this.pagedMessages.totalPages >= pageNumber)
    ) {
      this.loadingNewMessages = true;
      this.chatService
        .getAllMessages(pageNumber, this.pageSize, this.chat.id)
        .subscribe(response => {
          this.pagedMessages = response;
          this.currentPageNumber = this.pagedMessages.currentPage;
          this.currentMessages = this.currentMessages.concat(
            this.pagedMessages.messages
          );
          this.loadingNewMessages = false;
        });
    }
  }

  sendMessage() {
    if (this.chatCreate) {
      this.isCreatingChat = true;
      this.chatService.createChat(this.chatCreate).subscribe(response => {
        this.chat = response;
        this.chatCreate = null;
        this.send();
      });
    } else {
      this.send();
    }
  }

  send() {
    if (this.newMessage !== '') {
      this.chatHubService.sendMessage(
        this.newMessage,
        this.userId,
        this.chat.id,
        this.userId === this.chat.receiverId
          ? this.chat.senderId
          : this.chat.receiverId
      );
      this.newMessage = '';
    }
  }

  scrollToBottom() {
    try {
      if (this.isScrollingAllowed) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        if (this.currentMessages && this.currentMessages.length > 0) {
          this.isScrollingAllowed = false;
        }
      }
    } catch (err) {}
  }
}
