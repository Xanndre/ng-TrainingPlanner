import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { UserService } from 'src/app/services/User.service';
import { ReservationUser } from 'src/app/models/User/ReservationUser';
import { Training } from 'src/app/models/Training/Training';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  reservationUsers: ReservationUser[];
  training: Training;
  totalPages: number;
  totalCount: number;
  pageSize = 5;
  currentPage: number;

  isLoaded = false;

  @Input() isSignList = false;
  @Input() isSignedUp: boolean;
  @Input() trainingId: number;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers(1, true);
  }

  getUsers(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.users = [];
      this.reservationUsers = [];
    }
    if (this.isSignList) {
      this.userService
        .getSignedUpUsers(
          pageNumber,
          this.pageSize,
          this.trainingId,
          this.isSignedUp
        )
        .subscribe(response => {
          this.reservationUsers.push(...response.users);
          this.training = response.training;
          this.totalPages = response.totalPages;
          this.totalCount = response.totalCount;
          this.currentPage = pageNumber;
          this.isLoaded = true;
        });
    } else {
      this.userService
        .getUsers(pageNumber, this.pageSize)
        .subscribe(response => {
          this.users.push(...response.users);
          this.totalPages = response.totalPages;
          this.totalCount = response.totalCount;
          this.currentPage = pageNumber;
          this.isLoaded = true;
        });
    }
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getUsers(this.currentPage + 1);
    }
  }
}
