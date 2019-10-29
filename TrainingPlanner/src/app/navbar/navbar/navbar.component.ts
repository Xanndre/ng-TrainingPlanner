import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/Login.service';
import { Router, NavigationStart } from '@angular/router';
import { ClubService } from 'src/app/services/Club.service';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string;
  isLoaded = false;
  clubIds: number[] = [];
  hasClubs: boolean;
  subscription: Subscription;

  isClubsLoaded = false;

  ngOnInit() {
    if (this.isUserAuthenticated()) {
      this.userId = localStorage.getItem('userId');
      this.clubService
        .getClubs(1, 6, this.userId, true, false)
        .subscribe(response => {
          if (response.clubs.length !== 0) {
            response.clubs.forEach(c => {
              this.clubIds.push(c.id);
            });
          }
          this.getClubQuantity();
          this.isLoaded = true;
        });
    } else {
      this.isLoaded = true;
    }
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private clubService: ClubService
  ) {
    this.subscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        if (this.isUserAuthenticated()) {
          this.userId = localStorage.getItem('userId');
          this.isClubsLoaded = false;
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
}
