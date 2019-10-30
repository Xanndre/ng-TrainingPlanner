import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/Login.service';
import { ClubBase } from 'src/app/models/Club/ClubBase';

@Component({
  selector: 'app-club-list-item',
  templateUrl: './club-list-item.component.html',
  styleUrls: ['./club-list-item.component.css']
})
export class ClubListItemComponent implements OnInit {
  isUserAuthenticated: boolean;
  isProfile = false;

  @Input() club: ClubBase;
  @Input() isUser: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    if (this.route.snapshot.routeConfig.path === 'profile/clubs') {
      this.isProfile = true;
    }
  }

  viewDetails() {
    this.router.navigate([`/clubs/${this.club.id}`]);
  }

  editClub() {
    this.router.navigate([`profile/clubs/edit/${this.club.id}`]);
  }
}
