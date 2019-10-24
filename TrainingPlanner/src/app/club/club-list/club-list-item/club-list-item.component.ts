import { Component, OnInit, Input } from '@angular/core';
import { ClubGet } from 'src/app/models/ClubGet';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-club-list-item',
  templateUrl: './club-list-item.component.html',
  styleUrls: ['./club-list-item.component.css']
})
export class ClubListItemComponent implements OnInit {
  isUserAuthenticated: boolean;

  @Input() club: ClubGet;
  @Input() isUser: boolean;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
  }

  viewDetails() {
    this.router.navigate([`/clubs/${this.club.id}`]);
  }
}
