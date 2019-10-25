import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/Trainer.service';
import { TrainerGetBase } from 'src/app/models/TrainerGetBase';
import { LoginService } from 'src/app/services/Login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {
  trainers: TrainerGetBase[];

  userId: string;

  totalPages: number;
  totalCount: number;
  pageSize = 3;
  currentPage: number;

  isLoaded = false;
  isUserAuthenticated: boolean;
  isFavourite: boolean;

  constructor(
    private trainerService: TrainerService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    this.isFavourite = this.route.snapshot.data.isFavourite;
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
        console.log(this.trainers);
      });
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      console.log('jest wiecej');
      this.getTrainers(this.currentPage + 1);
    }
  }
}
