import { Component, OnInit, Input } from '@angular/core';
import { ClubService } from 'src/app/services/Club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubBase } from 'src/app/models/Club/ClubBase';
import { FavouriteClub } from 'src/app/models/Favourite/FavouriteClub';
import { FavouriteService } from 'src/app/services/Favourite.service';
import { ClubFilterData } from 'src/app/models/FilterData/ClubFilterData';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubs: ClubBase[] = [];
  userId: string;

  totalPages: number;
  totalCount: number;
  pageSize = 3;
  currentPage: number;

  isLoaded = false;
  isUser: boolean;
  isProfile = false;

  @Input() isFavourite: boolean;
  filterData: ClubFilterData = {};

  constructor(
    private clubService: ClubService,
    private favouriteService: FavouriteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isUser = this.route.snapshot.data.isUser;
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
        this.userId,
        this.filterData,
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

  addClub() {
    this.router.navigate(['profile/clubs/add']);
  }

  doFavourite(club: ClubBase) {
    if (club.isFavourite) {
      this.favouriteService.deleteFavouriteClub(club.id).subscribe(() => {
        this.getClubs(1, true);
      });
    } else {
      const favourite: FavouriteClub = new FavouriteClub();
      favourite.userId = this.userId;
      favourite.clubId = club.id;
      this.favouriteService.createFavouriteClub(favourite).subscribe(() => {
        this.getClubs(1, true);
      });
    }
  }
}
