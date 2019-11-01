import { Component, OnInit, Input } from '@angular/core';
import { TrainerService } from 'src/app/services/Trainer.service';
import { TrainerBase } from 'src/app/models/Trainer/TrainerBase';
import { LoginService } from 'src/app/services/Login.service';
import { FavouriteService } from 'src/app/services/Favourite.service';
import { FavouriteTrainer } from 'src/app/models/Favourite/FavouriteTrainer';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {
  trainers: TrainerBase[];

  userId: string;

  totalPages: number;
  totalCount: number;
  pageSize = 3;
  currentPage: number;

  isLoaded = false;
  isUserAuthenticated: boolean;

  @Input() isFavourite: boolean;

  constructor(
    private trainerService: TrainerService,
    private loginService: LoginService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    this.userId = localStorage.getItem('userId');
    this.getTrainers(1, true);
  }

  getTrainers(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.trainers = [];
    }
    this.trainerService
      .getTrainers(
        pageNumber,
        this.pageSize,
        this.isUserAuthenticated ? this.userId : null,
        this.isFavourite
      )
      .subscribe(response => {
        this.trainers.push(...response.trainers);
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.isLoaded = true;
      });
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getTrainers(this.currentPage + 1);
    }
  }

  doFavourite(trainer: TrainerBase) {
    if (trainer.isFavourite) {
      this.favouriteService.deleteFavouriteTrainer(trainer.id).subscribe(() => {
        this.getTrainers(1, true);
      });
    } else {
      const favourite: FavouriteTrainer = new FavouriteTrainer();
      favourite.userId = this.userId;
      favourite.trainerId = trainer.id;
      this.favouriteService.createFavouriteTrainer(favourite).subscribe(() => {
        this.getTrainers(1, true);
      });
    }
  }
}
