import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrainerBase } from 'src/app/models/Trainer/TrainerBase';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-trainer-list-item',
  templateUrl: './trainer-list-item.component.html',
  styleUrls: ['./trainer-list-item.component.css']
})
export class TrainerListItemComponent implements OnInit {
  sports = '';
  isUserAuthenticated: boolean;

  @Input() trainer: TrainerBase;
  @Output() favouriteChange = new EventEmitter<TrainerBase>();

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    this.trainer.sports.forEach(s => {
      if (s === this.trainer.sports[this.trainer.sports.length - 1]) {
        this.sports += s.sport.name;
      } else {
        this.sports += s.sport.name + ' | ';
      }
    });
  }

  doFavourite() {
    this.favouriteChange.emit(this.trainer);
  }
}
