import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/Trainer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/Trainer/Trainer';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {
  trainerId: number;
  trainer: Trainer;
  sports = '';
  isLoaded: boolean;
  displayedColumns: string[] = ['name', 'validityPeriod', 'entries', 'price'];

  constructor(
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.trainerId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.trainerService.getTrainer(this.trainerId, true).subscribe(response => {
      this.trainer = response;
      this.trainer.priceList.sort((a, b) => a.name.localeCompare(b.name));
      this.trainer.sports.forEach(s => {
        if (s === this.trainer.sports[this.trainer.sports.length - 1]) {
          this.sports += s.sport.name;
        } else {
          this.sports += s.sport.name + ' | ';
        }
      });
      this.isLoaded = true;
    });
  }

  goToReviews() {
    this.router.navigate([`/trainers/${this.trainerId}/reviews`]);
  }
}
