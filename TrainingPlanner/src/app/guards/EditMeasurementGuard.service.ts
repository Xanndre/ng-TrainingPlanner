import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { BodyMeasurementService } from '../services/BodyMeasurement.service';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class EditMeasurementGuardService implements CanActivate {
  constructor(
    private router: Router,
    private bodyMeasurementService: BodyMeasurementService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const userId = localStorage.getItem('userId');
    const measurementId = parseInt(route.paramMap.get('id'), 10);
    return this.bodyMeasurementService.getBodyMeasurement(measurementId).pipe(
      map(response => {
        if (response.userId === userId) {
          return true;
        }
        this.router.navigate(['/measurements']);
        return false;
      })
    );
  }
}
