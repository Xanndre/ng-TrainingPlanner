import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerGetBase } from 'src/app/models/Trainer/TrainerGetBase';

@Component({
  selector: 'app-trainer-list-item',
  templateUrl: './trainer-list-item.component.html',
  styleUrls: ['./trainer-list-item.component.css']
})
export class TrainerListItemComponent implements OnInit {
  sports = '';

  @Input() trainer: TrainerGetBase;

  constructor(private router: Router) {}

  ngOnInit() {
    this.trainer.sports.forEach(s => {
      if (s === this.trainer.sports[this.trainer.sports.length - 1]) {
        this.sports += s.sport.name;
      } else {
        this.sports += s.sport.name + ' | ';
      }
    });
  }

  viewDetails() {
    this.router.navigate([`/trainers/${this.trainer.id}`]);
  }
}
