import { Injectable } from '@angular/core';
import { UserTrainingService } from '../services/UserTraining.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class EditUserTrainingGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userTrainingService: UserTrainingService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const userId = localStorage.getItem('userId');
    const trainingId = parseInt(route.paramMap.get('id'), 10);
    return this.userTrainingService.getUserTraining(trainingId).pipe(
      map(response => {
        if (response.userId === userId) {
          return true;
        }
        this.router.navigate(['/training_creator']);
        return false;
      })
    );
  }
}
