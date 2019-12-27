import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatDetailsComponent } from './chat/chat-details/chat-details.component';
import { ChatMessageComponent } from './chat/chat-details/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatDetailsComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    InfiniteScrollModule,
    NgbModule,
    MatCardModule
  ],
  exports: [ChatComponent]
})
export class ChatModule {}
