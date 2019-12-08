import { Component, OnInit } from '@angular/core';
import { UserTrainingBase } from 'src/app/models/UserStuff/UserTraining/UserTrainingBase';
import { UserTrainingService } from 'src/app/services/UserTraining.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-training-list',
  templateUrl: './user-training-list.component.html',
  styleUrls: ['./user-training-list.component.css']
})
export class UserTrainingListComponent implements OnInit {
  trainings: UserTrainingBase[] = [];
  isLoaded = false;

  totalPages: number;
  totalCount: number;
  pageSize = 5;
  currentPage: number;

  userId: string;

  constructor(
    private userTrainingService: UserTrainingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getTrainings(1, true);
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getTrainings(this.currentPage + 1);
    }
  }

  getTrainings(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.trainings = [];
    }
    this.userTrainingService
      .getUserTrainings(pageNumber, this.pageSize, this.userId)
      .subscribe(response => {
        this.trainings.push(...response.userTrainings);
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.isLoaded = true;
      });
  }

  addTraining() {
    this.router.navigate(['/training_creator/add']);
  }
}
