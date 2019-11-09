import { Component, OnInit, Input } from '@angular/core';
import { TrainerCardBase } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardBase';
import { MatDialog } from '@angular/material';
import { CardDialogComponent } from 'src/app/shared/card-dialog/card-dialog.component';

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

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  deleteCard() {
    this.dialog.open(CardDialogComponent, {
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
    this.dialog.open(CardDialogComponent, {
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
    this.dialog.open(CardDialogComponent, {
      data: {
        userId: this.userId,
        trainerId: this.trainerId,
        action: 'Deactivate',
        id: this.card.id
      },
      width: '400px'
    });
  }

  viewDetails() {}
}
