import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/Login.service';
import { Router } from '@angular/router';
import { ClubService } from 'src/app/services/Club.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string;
  hasClubs: boolean;

  ngOnInit() {
    if (this.isUserAuthenticated) {
      this.userId = localStorage.getItem('userId');
      this.clubService
        .getClubs(1, 6, this.userId, true, false)
        .subscribe(response => {
          if (response.clubs.length !== 0) {
            this.hasClubs = true;
          } else {
            this.hasClubs = false;
          }
        });
    }
  }
  constructor(
    private loginService: LoginService,
    private router: Router,
    private clubService: ClubService
  ) {}

  isUserAuthenticated() {
    return this.loginService.isUserAuthenticated();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
