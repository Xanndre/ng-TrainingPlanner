import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/Club.service';
import { LoginService } from 'src/app/services/Login.service';
import { ActivatedRoute } from '@angular/router';
import { ClubGetBase } from 'src/app/models/ClubGetBase';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubs: ClubGetBase[] = [];
  userId: string;

  totalPages: number;
  totalCount: number;
  pageSize = 6;
  currentPage: number;

  isLoaded = false;
  isUserAuthenticated: boolean;
  isUser: boolean;
  isFavourite: boolean;

  constructor(
    private clubService: ClubService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    this.isUser = this.route.snapshot.data.isUser;
    this.isFavourite = this.route.snapshot.data.isFavourites;
    this.userId = localStorage.getItem('userId');
    this.getClubs(1, true);
  }

  getClubs(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.clubs = [];
    }
    this.clubService
      .getClubs(
        pageNumber,
        this.pageSize,
        this.isUserAuthenticated ? this.userId : null,
        this.isUser,
        this.isFavourite
      )
      .subscribe(response => {
        this.clubs.push(...response.clubs);
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.isLoaded = true;
      });
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getClubs(this.currentPage + 1);
    }
  }
}
