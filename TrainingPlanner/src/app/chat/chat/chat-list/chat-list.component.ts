import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/Chat/Chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Input() chats: Chat[] = [];
  @Input() currentChat: Chat;

  @Output() openChat = new EventEmitter<Chat>();

  userId: string;

  constructor() {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
}
