import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/Login.service';
import { ClubBase } from 'src/app/models/Club/ClubBase';
import { MatDialog } from '@angular/material';
import { DeleteClubDialogComponent } from 'src/app/shared/delete-club-dialog/delete-club-dialog.component';

@Component({
  selector: 'app-club-list-item',
  templateUrl: './club-list-item.component.html',
  styleUrls: ['./club-list-item.component.css']
})
export class ClubListItemComponent implements OnInit {
  isUserAuthenticated: boolean;
  isProfile = false;

  @Input() club: ClubBase;
  @Input() isUser: boolean;
  @Output() favouriteChange = new EventEmitter<ClubBase>();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isUserAuthenticated = this.loginService.isUserAuthenticated();
    if (this.route.snapshot.routeConfig.path === 'profile/clubs') {
      this.isProfile = true;
    }
  }

  editClub() {
    this.router.navigate([`profile/clubs/edit/${this.club.id}`]);
  }

  doFavourite() {
    this.favouriteChange.emit(this.club);
  }

  viewSales() {
    this.router.navigate([`clubs/${this.club.id}/cards`]);
  }

  viewCalendar() {
    this.router.navigate([`profile/clubs/${this.club.id}/calendar`]);
  }

  deleteClub() {
    this.openDeleteDialog(
      'Do you really want to delete this club profile? This process cannot be undone.'
    );
  }

  openDeleteDialog(error: string): void {
    this.dialog.open(DeleteClubDialogComponent, {
      data: { errorMsg: error, clubId: this.club.id },
      width: '400px'
    });
  }
}
