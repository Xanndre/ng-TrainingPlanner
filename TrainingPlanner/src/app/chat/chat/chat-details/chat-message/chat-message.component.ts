import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/Chat/Message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() isSender: boolean;
  @Input() message: Message;

  constructor() {}
}
