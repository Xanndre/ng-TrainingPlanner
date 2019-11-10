import { Component, OnInit, Input } from '@angular/core';
import { ClubCardBase } from 'src/app/models/ClubStuff/ClubCard/ClubCardBase';
import { MatDialog } from '@angular/material';
import { ClubCardDialogComponent } from 'src/app/shared/club-card-dialog/club-card-dialog.component';

@Component({
  selector: 'app-club-card-list-item',
  templateUrl: './club-card-list-item.component.html',
  styleUrls: ['./club-card-list-item.component.css']
})
export class ClubCardListItemComponent implements OnInit {
  @Input() card: ClubCardBase;
  @Input() isClub: boolean;
  @Input() isUser: boolean;
  @Input() userId: number;
  @Input() clubId: number;

  isLoaded: boolean;

  date: string;
  inactive = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.date = new Date(this.card.expirationDate).toLocaleDateString();
    const expDate = new Date(this.card.expirationDate);
    const now = new Date(Date.now());

    if (
      this.card.expirationDate === null ||
      (expDate.getTime() <= now.getTime() && !this.card.unlimitedValidityPeriod)
    ) {
      this.inactive = true;
    }
    this.isLoaded = true;
  }

  deleteCard() {
    this.dialog.open(ClubCardDialogComponent, {
      data: {
        userId: this.userId,
        clubId: this.clubId,
        action: 'Delete',
        id: this.card.id
      },
      width: '400px'
    });
  }

  editCard() {
    this.dialog.open(ClubCardDialogComponent, {
      data: {
        userId: this.userId,
        trainerId: this.clubId,
        action: 'Edit',
        id: this.card.id
      },
      width: '228px'
    });
  }

  deactivateCard() {
    this.dialog.open(ClubCardDialogComponent, {
      data: {
        userId: this.userId,
        trainerId: this.clubId,
        action: 'Deactivate',
        id: this.card.id
      },
      width: '400px'
    });
  }

  viewDetails() {}
}
