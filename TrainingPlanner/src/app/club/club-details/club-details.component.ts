import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/models/Club/Club';
import { ClubService } from 'src/app/services/Club.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {
  clubId: number;
  club: Club;
  isLoaded: boolean;
  displayedColumnsPricelist: string[] = [
    'name',
    'validityPeriod',
    'entries',
    'price'
  ];
  displayedColumnsWorkingHours: string[] = ['day', 'openHour', 'closeHour'];

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.clubId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.clubService.getClub(this.clubId).subscribe(response => {
      this.club = response;
      this.isLoaded = true;
    });
  }
}
