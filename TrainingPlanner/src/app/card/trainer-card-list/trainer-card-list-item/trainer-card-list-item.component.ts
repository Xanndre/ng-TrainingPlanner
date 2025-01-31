import { Component, OnInit, Input } from '@angular/core';
import { TrainerCardBase } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardBase';
import { MatDialog } from '@angular/material';
import { TrainerCardDialogComponent } from 'src/app/shared/trainer-card-dialog/trainer-card-dialog.component';
import { CardDetailsComponent } from '../../card-details/card-details.component';

@Component({
  selector: 'app-trainer-card-list-item',
  templateUrl: './trainer-card-list-item.component.html',
  styleUrls: ['./trainer-card-list-item.component.css']
})
export class TrainerCardListItemComponent implements OnInit {
  @Input() card: TrainerCardBase;
  @Input() isTrainer: boolean;
  @Input() isUser: boolean;
  @Input() userId: number;
  @Input() trainerId: number;

  isLoaded: boolean;

  date: string;
  inactive = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (this.card.expirationDate) {
      this.date = new Date(this.card.expirationDate).toLocaleDateString();
    } else {
      this.date = null;
    }
    const expDate = new Date(this.card.expirationDate);
    const now = new Date(Date.now());

    if (
      this.card.expirationDate !== null &&
      expDate.getTime() <= now.getTime()
    ) {
      this.inactive = true;
    }
    this.isLoaded = true;
  }

  deleteCard() {
    this.dialog.open(TrainerCardDialogComponent, {
      data: {
        userId: this.userId,
        trainerId: this.trainerId,
        action: 'Delete',
        id: this.card.id
      },
      width: '400px'
    });
  }

  editCard() {
    this.dialog.open(TrainerCardDialogComponent, {
      data: {
        userId: this.userId,
        trainerId: this.trainerId,
        action: 'Edit',
        id: this.card.id
      },
      width: '228px'
    });
  }

  deactivateCard() {
    this.dialog.open(TrainerCardDialogComponent, {
      data: {
        userId: this.userId,
        trainerId: this.trainerId,
        action: 'Deactivate',
        id: this.card.id
      },
      width: '400px'
    });
  }

  viewDetails() {
    this.dialog.open(CardDetailsComponent, {
      data: { id: this.card.id, isClub: false, isTrainer: true },
      width: '300px'
    });
  }
}
