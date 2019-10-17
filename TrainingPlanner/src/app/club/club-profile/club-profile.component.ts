import { Component, OnInit, Input } from '@angular/core';
import { ClubProfileForm } from './club-profile-form';
import { ClubProfileControls } from './club-profile-controls';
import { FormBuilder } from '@angular/forms';
import { ClubGet } from 'src/app/models/ClubGet';
import { ClubPrice } from 'src/app/models/ClubPrice';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.css']
})
export class ClubProfileComponent implements OnInit {
  clubForm: ClubProfileForm = new ClubProfileForm();
  formControls: ClubProfileControls;
  isLoaded = true;
  isClub: boolean;
  club: ClubGet = null;
  clubId: number;
  priceList: ClubPrice[] = [];

  @Input() table: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formControls = new ClubProfileControls();
    this.clubForm.buildForm(this.formBuilder, this.club);
    this.formControls.initializeControls(this.clubForm);
  }

  deleteClubAccount() {}

  createClubAccount() {}

  receivePriceList($event) {
    this.priceList = $event;
  }
}
