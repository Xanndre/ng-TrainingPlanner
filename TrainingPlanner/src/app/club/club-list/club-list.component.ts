import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/Club.service';
import { LoginService } from 'src/app/services/Login.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  isProfile = false;

  constructor(
    private clubService: ClubService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    this.isUser = this.route.snapshot.data.isUser;
    this.isFavourite = this.route.snapshot.data.isFavourites;
    if (this.route.snapshot.routeConfig.path === 'profile/clubs') {
      this.isProfile = true;
    }
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
        console.log(this.clubs);
      });
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getClubs(this.currentPage + 1);
    }
  }

  addClub() {
    this.router.navigate(['profile/clubs/add']);
  }
}
