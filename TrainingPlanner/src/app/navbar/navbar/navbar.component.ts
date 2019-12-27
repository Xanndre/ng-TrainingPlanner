import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/Login.service';
import { Router, NavigationStart } from '@angular/router';
import { ClubService } from 'src/app/services/Club.service';
import { Subscription } from 'rxjs';
import { ChatHubService } from 'src/app/services/ChatHub.service';

export let browserRefresh = false;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string;
  clubIds: number[] = [];
  hasClubs: boolean;
  subscription: Subscription;

  isLoaded = false;
  isClubsLoaded = false;
  isTrainer = false;

  ngOnInit() {
    if (this.isUserAuthenticated()) {
      this.userId = localStorage.getItem('userId');
      this.chatHubService.initHubConnection();
      this.clubService.getClubIds(this.userId).subscribe(response => {
        this.clubIds = response;
        this.getClubQuantity();
        this.isLoaded = true;
      });
    } else {
      this.chatHubService.closeHubConnection();
      this.isLoaded = true;
    }
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private clubService: ClubService,
    private chatHubService: ChatHubService
  ) {
    this.subscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        if (this.isUserAuthenticated()) {
          this.userId = localStorage.getItem('userId');
          this.isClubsLoaded = false;
          this.getClubIds();
          this.getClubQuantity();
        }
      }
    });
  }

  isUserAuthenticated() {
    return this.loginService.isUserAuthenticated();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }

  getClubQuantity() {
    this.hasClubs = false;
    this.clubService.getClubQuantity(this.userId).subscribe(response => {
      if (response !== 0) {
        this.hasClubs = true;
      }
      this.isClubsLoaded = true;
    });
  }

  getClubIds() {
    this.clubIds = [];
    this.clubService.getClubIds(this.userId).subscribe(response => {
      this.clubIds = response;
    });
  }
}
