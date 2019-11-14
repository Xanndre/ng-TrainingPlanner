import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/User.service';
import { SportService } from 'src/app/services/Sport.service';
import { CustomControl } from 'src/app/shared/custom-control/custom-control';
import { User } from 'src/app/models/User/User';

@Component({
  selector: 'app-training-partner',
  templateUrl: './training-partner.component.html',
  styleUrls: ['./training-partner.component.css']
})
export class TrainingPartnerComponent implements OnInit {
  sportControl: CustomControl = new CustomControl();
  locationControl: CustomControl = new CustomControl();

  sports: string[] = [];
  locations: string[] = [];
  user: User;
  userId: string;

  userSports: string[] = [];
  userLocations: string[] = [];

  isSportsLoaded: boolean;
  isLocationsLoaded: boolean;
  isUserLoaded: boolean;
  isUpdated: boolean;

  sportForm: FormGroup;
  locationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sportService: SportService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;
      this.user.sports.forEach(s => {
        this.userSports.push(s.sport);
      });
      this.user.locations.forEach(s => {
        this.userLocations.push(s.location);
      });
      this.sportForm = this.formBuilder.group({
        sports: [this.userSports ? this.userSports : '', Validators.required]
      });
      this.locationForm = this.formBuilder.group({
        locations: [
          this.userLocations ? this.userLocations : '',
          Validators.required
        ]
      });
      this.initializeSportControl();
      this.initializeLocationControl();
      if (this.user.sports.length !== 0 && this.user.locations.length !== 0) {
        this.isUpdated = true;
      }
      this.isUserLoaded = true;
    });
  }

  initializeSportControl() {
    this.sportService.getAllSports().subscribe(response => {
      response.forEach(sport => {
        this.sports.push(sport.name);
      });

      this.sportControl = {
        formGroup: this.sportForm,
        controlType: 'select',
        multiple: true,
        formControlName: 'sports',
        placeholder: 'Sports',
        values: this.sports,
        label: 'Sports'
      };
      this.isSportsLoaded = true;
    });
  }

  initializeLocationControl() {
    this.userService.getLocations().subscribe(response => {
      this.locations = response;

      this.locationControl = {
        formGroup: this.locationForm,
        controlType: 'select',
        multiple: true,
        formControlName: 'locations',
        placeholder: 'Locations',
        values: this.locations,
        label: 'Locations'
      };
      this.isLocationsLoaded = true;
    });
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;
      this.isUserLoaded = true;
    });
  }

  updateUser() {
    this.isUpdated = false;
    this.user.sports = [];
    this.user.locations = [];
    this.sportForm.value.sports.forEach(s => {
      this.user.sports.push({ userId: this.userId, sport: s });
    });
    this.locationForm.value.locations.forEach(s => {
      this.user.locations.push({ userId: this.userId, location: s });
    });
    this.userService.updateUser(this.user, true).subscribe(() => {
      this.isUpdated = true;
    });
  }

  findPartners(event) {
    if (event.selectedIndex === 2) {
      this.updateUser();
    }
  }
}
