import { Component, OnInit, Input } from '@angular/core';
import { TrainerGet } from 'src/app/models/TrainerGet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-list-item',
  templateUrl: './trainer-list-item.component.html',
  styleUrls: ['./trainer-list-item.component.css']
})
export class TrainerListItemComponent implements OnInit {
  sports = '';

  @Input() trainer: TrainerGet;

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
