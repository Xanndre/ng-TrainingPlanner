import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent {
  @Input() user: User;

  constructor(private router: Router) {}

  manageCards() {
    const id = this.user.id;
    this.router.navigate([`/users/${id}/trainer_cards`]);
  }
}
