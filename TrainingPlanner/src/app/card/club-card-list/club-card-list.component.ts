import { Component, OnInit } from '@angular/core';
import { ClubCardBase } from 'src/app/models/ClubStuff/ClubCard/ClubCardBase';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/Card.service';

@Component({
  selector: 'app-club-card-list',
  templateUrl: './club-card-list.component.html',
  styleUrls: ['./club-card-list.component.css']
})
export class ClubCardListComponent implements OnInit {
  cards: ClubCardBase[] = [];

  isClub = false;
  isUser = false;
  isLoaded = false;

  totalPages: number;
  totalCount: number;
  pageSize = 3;
  currentPage: number;

  userId: string;
  clubId: number;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isUser = this.route.snapshot.data.isUser;
    this.isClub = this.route.snapshot.data.isClub;
    this.clubId = parseInt(this.route.snapshot.paramMap.get('clubId'), 10);
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getCards(1, true);
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getCards(this.currentPage + 1);
    }
  }

  getCards(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.cards = [];
    }
    this.cardService
      .getClubCards(
        pageNumber,
        this.pageSize,
        this.isUser ? this.userId : null,
        this.isClub ? this.clubId : null
      )
      .subscribe(response => {
        this.cards.push(...response.cards);
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.isLoaded = true;
      });
  }

  goToUserList() {
    this.router.navigate([`/clubs/${this.clubId}/users`]);
  }

  addCard() {
    console.log('Tu będzie dodawanie karty');
  }
}
