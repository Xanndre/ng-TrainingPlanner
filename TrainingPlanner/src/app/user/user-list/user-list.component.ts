import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  totalPages: number;
  totalCount: number;
  pageSize = 5;
  currentPage: number;

  isLoaded = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers(1, true);
  }

  getUsers(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.users = [];
    }
    this.userService.getUsers(pageNumber, this.pageSize).subscribe(response => {
      this.users.push(...response.users);
      this.totalPages = response.totalPages;
      this.totalCount = response.totalCount;
      this.currentPage = pageNumber;
      this.isLoaded = true;
    });
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getUsers(this.currentPage + 1);
    }
  }
}
