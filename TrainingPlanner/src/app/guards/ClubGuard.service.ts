import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ClubService } from '../services/Club.service';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class ClubGuardService implements CanActivate {
  constructor(private clubService: ClubService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const userId = localStorage.getItem('userId');
    const clubId = parseInt(route.paramMap.get('clubId'), 10);
    return this.clubService.getClub(clubId).pipe(
      map(response => {
        if (response.user.id === userId) {
          return true;
        }
        this.router.navigate(['/clubs']);
        return false;
      })
    );
  }
}
