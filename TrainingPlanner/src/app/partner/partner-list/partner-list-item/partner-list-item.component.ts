import { Component, OnInit, Input } from '@angular/core';
import { Partner } from 'src/app/models/User/Partner';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/Chat.service';
import { ChatCreate } from 'src/app/models/Chat/ChatCreate';
import { DataTransferService } from 'src/app/services/DataTransfer.service';

@Component({
  selector: 'app-partner-list-item',
  templateUrl: './partner-list-item.component.html',
  styleUrls: ['./partner-list-item.component.css']
})
export class PartnerListItemComponent implements OnInit {
  @Input() partner: Partner;
  sports = '';
  userId: string;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.partner.sports.forEach(s => {
      if (s === this.partner.sports[this.partner.sports.length - 1]) {
        this.sports += s.sport;
      } else {
        this.sports += s.sport + ' | ';
      }
    });
  }

  openChat() {
    const chat: ChatCreate = {
      receiverId: this.partner.id,
      senderId: this.userId
    };
    this.chatService.getChat(chat.receiverId).subscribe(
      res => {
        this.dataTransferService.setChatId(res.id);
        this.router.navigate(['chat']);
      },
      err => {
        if (err.status === 404) {
          this.dataTransferService.setIsCreateChat(true);
          this.dataTransferService.setChat(chat);
          this.router.navigate(['chat']);
        }
      }
    );
  }
}
