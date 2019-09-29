import { Component } from '@angular/core';
import { LoginService } from '../../services/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  isUserAuthenticated() {
    return this.loginService.isUserAuthenticated();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
