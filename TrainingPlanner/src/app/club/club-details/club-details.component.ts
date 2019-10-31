import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/models/Club/Club';
import { ClubService } from 'src/app/services/Club.service';
import { ActivatedRoute } from '@angular/router';
import { Picture } from 'src/app/models/Stuff/Picture';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {
  clubId: number;
  club: Club;
  isLoaded: boolean;
  pictures: Picture[];
  displayedColumnsPricelist: string[] = [
    'name',
    'validityPeriod',
    'entries',
    'price'
  ];
  displayedColumnsWorkingHours: string[] = ['day', 'openHour', 'closeHour'];

  weekdaySorter = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
  };

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.clubId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.clubService.getClub(this.clubId).subscribe(response => {
      this.club = response;
      this.club.workingHours.sort(
        (a, b) => this.weekdaySorter[a.day] - this.weekdaySorter[b.day]
      );
      this.club.pictures.sort(
        (pic1, pic2) => pic1.displayOrder - pic2.displayOrder
      );
      this.pictures = this.club.pictures.slice(1, this.club.pictures.length);
      this.isLoaded = true;
    });
  }
}
