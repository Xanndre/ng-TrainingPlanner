import { Component, OnInit, Input } from '@angular/core';
import { TrainerService } from 'src/app/services/Trainer.service';
import { TrainerBase } from 'src/app/models/Trainer/TrainerBase';
import { FavouriteService } from 'src/app/services/Favourite.service';
import { FavouriteTrainer } from 'src/app/models/Favourite/FavouriteTrainer';
import { TrainerFilterData } from 'src/app/models/FilterData/TrainerFilterData';

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

  @Input() isFavourite: boolean;
  filterData: TrainerFilterData = {};

  constructor(
    private trainerService: TrainerService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit() {
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
        this.userId,
        this.filterData,
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
