import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TrainerService } from 'src/app/services/Trainer.service';
import { ClubService } from 'src/app/services/Club.service';
import { CardService } from 'src/app/services/Card.service';
import { TrainerPrice } from 'src/app/models/TrainerStuff/TrainerPrice';
import { TrainerCardCreate } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardCreate';
import { Trainer } from 'src/app/models/Trainer/Trainer';
import { TrainerCard } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCard';
import { TrainerCardUpdate } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardUpdate';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {
  trainerPriceList: TrainerPrice[];
  trainerPrice: TrainerPrice;
  trainer: Trainer;
  isLoaded: boolean;
  trainerCardCreate: TrainerCardCreate;
  trainerCardUpdate: TrainerCardUpdate;

  action: string;
  trainerCard: TrainerCard;

  constructor(
    private trainerService: TrainerService,
    private clubService: ClubService,
    private cardService: CardService,
    private dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.action = this.data.action;
    if (this.data.id) {
      this.cardService.getTrainerCard(this.data.id).subscribe(response => {
        this.trainerCard = response;
        this.getTrainer();
      });
    } else {
      this.trainerCard = new TrainerCard();
      this.getTrainer();
    }
  }

  addCard() {
    this.trainerPrice = this.trainerPriceList.find(
      c => c.name === this.trainerCard.name
    );

    this.trainerCardCreate = {
      trainerId: this.data.trainerId,
      userId: this.data.userId,
      name: this.trainerCard.name,
      unlimitedEntries: this.trainerPrice.unlimitedEntries,
      unlimitedValidityPeriod: this.trainerPrice.unlimitedValidityPeriod,
      validityPeriod: this.trainerPrice.validityPeriod,
      entries: this.trainerPrice.entries,
      price: this.trainerPrice.price,
      trainerName:
        this.trainer.user.firstName + ' ' + this.trainer.user.lastName,
      entriesLeft: this.trainerPrice.entries
    };
    this.cardService.createTrainerCard(this.trainerCardCreate).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }

  getTrainer() {
    this.trainerService.getTrainer(this.data.trainerId).subscribe(response => {
      this.trainer = response;
      this.trainerPriceList = response.priceList;
      this.isLoaded = true;
    });
  }

  editCard() {
    this.trainerPrice = this.trainerPriceList.find(
      c => c.name === this.trainerCard.name
    );

    this.trainerCardUpdate = {
      id: this.trainerCard.id,
      purchaseDate: this.trainerCard.purchaseDate,
      expirationDate: !this.trainerPrice.unlimitedValidityPeriod
        ? this.trainerCard.expirationDate
        : this.trainerCard.purchaseDate,
      trainerId: this.data.trainerId,
      userId: this.data.userId,
      name: this.trainerCard.name,
      unlimitedEntries: this.trainerPrice.unlimitedEntries,
      unlimitedValidityPeriod: this.trainerPrice.unlimitedValidityPeriod,
      validityPeriod: this.trainerPrice.validityPeriod,
      entries: this.trainerPrice.entries,
      price: this.trainerPrice.price,
      trainerName:
        this.trainer.user.firstName + ' ' + this.trainer.user.lastName,
      entriesLeft: this.trainerPrice.entries
    };
    console.log(this.trainerCardUpdate);
    this.cardService.updateTrainerCard(this.trainerCardUpdate).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }

  deleteCard() {}
}
