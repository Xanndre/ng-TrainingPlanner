import { Component, OnInit } from '@angular/core';
import { TrainerCardBase } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardBase';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/Card.service';
import { MatDialog } from '@angular/material';
import { TrainerCardDialogComponent } from 'src/app/shared/trainer-card-dialog/trainer-card-dialog.component';

@Component({
  selector: 'app-trainer-card-list',
  templateUrl: './trainer-card-list.component.html',
  styleUrls: ['./trainer-card-list.component.css']
})
export class TrainerCardListComponent implements OnInit {
  cards: TrainerCardBase[] = [];

  isTrainer = false;
  isUser = false;
  isLoaded = false;

  totalPages: number;
  totalCount: number;
  pageSize = 3;
  currentPage: number;

  userId: string;
  trainerId: number;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isUser = this.route.snapshot.data.isUser;
    this.isTrainer = this.route.snapshot.data.isTrainer;
    this.trainerId = parseInt(
      this.route.snapshot.paramMap.get('trainerId'),
      10
    );
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
      .getTrainerCards(
        pageNumber,
        this.pageSize,
        this.isUser ? this.userId : null,
        this.isTrainer ? this.trainerId : null
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
    this.router.navigate([`/trainers/${this.trainerId}/users`]);
  }

  addCard() {
    this.dialog.open(TrainerCardDialogComponent, {
      data: { userId: this.userId, trainerId: this.trainerId, action: 'Add' },
      width: '228px'
    });
  }
}
