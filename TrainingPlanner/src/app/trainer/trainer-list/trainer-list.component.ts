import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/Trainer.service';
import { TrainerGet } from 'src/app/models/TrainerGet';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {
  trainers: TrainerGet[];
  isLoaded: boolean;

  constructor(private trainerService: TrainerService) {}

  ngOnInit() {
    this.trainerService.getAllTrainers().subscribe(response => {
      this.trainers = response;
      this.isLoaded = true;
      console.log(this.trainers);
    });
  }
}
