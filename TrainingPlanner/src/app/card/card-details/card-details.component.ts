import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CardService } from 'src/app/services/Card.service';
import { TrainerCard } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCard';
import { ClubCard } from 'src/app/models/ClubStuff/ClubCard/ClubCard';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  clubCard: ClubCard;
  trainerCard: TrainerCard;
  isLoaded: boolean;
  purchaseDate: string;
  expirationDate: string;

  constructor(
    private cardService: CardService,
    private dialogRef: MatDialogRef<CardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data.isClub) {
      this.cardService.getClubCard(this.data.id).subscribe(response => {
        this.clubCard = response;
        this.purchaseDate = new Date(
          this.clubCard.purchaseDate
        ).toLocaleDateString();
        this.expirationDate = this.clubCard.expirationDate
          ? new Date(this.clubCard.expirationDate).toLocaleDateString()
          : null;
        this.isLoaded = true;
      });
    } else {
      this.cardService.getTrainerCard(this.data.id).subscribe(response => {
        this.trainerCard = response;
        this.purchaseDate = new Date(
          this.trainerCard.purchaseDate
        ).toLocaleDateString();
        this.expirationDate = this.trainerCard.expirationDate
          ? new Date(this.trainerCard.expirationDate).toLocaleDateString()
          : null;
        this.isLoaded = true;
      });
    }
  }
}
