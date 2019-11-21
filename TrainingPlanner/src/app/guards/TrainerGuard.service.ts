import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TrainerService } from '../services/Trainer.service';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class TrainerGuardService implements CanActivate {
  constructor(private router: Router, private trainerService: TrainerService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const userId = localStorage.getItem('userId');
    const trainerId = parseInt(route.paramMap.get('trainerId'), 10);
    return this.trainerService.getTrainer(trainerId).pipe(
      map(response => {
        if (response.user.id === userId) {
          return true;
        }
        this.router.navigate(['/trainers']);
        return false;
      })
    );
  }
}
