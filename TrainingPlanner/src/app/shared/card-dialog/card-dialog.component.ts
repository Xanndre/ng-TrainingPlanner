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
import { UserService } from 'src/app/services/User.service';
import { User } from 'src/app/models/User/User';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {
  trainerPriceList: TrainerPrice[];
  trainerPrice: TrainerPrice;
  trainer: Trainer;
  user: User;
  isLoaded: boolean;
  trainerCardCreate: TrainerCardCreate;
  trainerCardUpdate: TrainerCardUpdate;

  action: string;
  trainerCard: TrainerCard;

  constructor(
    private trainerService: TrainerService,
    private clubService: ClubService,
    private userService: UserService,
    private cardService: CardService,
    private dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<any> {
    this.action = this.data.action;
    if (this.data.id) {
      this.cardService
        .getTrainerCard(this.data.id)
        .subscribe(async response => {
          this.trainerCard = response;
          await this.getTrainer();
          await this.getUser();
          this.isLoaded = true;
        });
    } else {
      this.trainerCard = new TrainerCard();
      await this.getTrainer();
      await this.getUser();
      this.isLoaded = true;
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
      userName: this.user.firstName + ' ' + this.user.lastName,
      trainerName:
        this.trainer.user.firstName + ' ' + this.trainer.user.lastName,
      entriesLeft: this.trainerPrice.entries
    };
    this.cardService.createTrainerCard(this.trainerCardCreate).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }

  async getTrainer() {
    const trainer = await this.trainerService
      .getTrainer(this.data.trainerId)
      .toPromise();
    this.trainer = trainer;
    this.trainerPriceList = trainer.priceList;
  }

  async getUser() {
    const user = await this.userService.getUser(this.data.userId).toPromise();
    this.user = user;
  }

  editCard() {
    this.trainerPrice = this.trainerPriceList.find(
      c => c.name === this.trainerCard.name
    );
    this.trainerCardUpdate = {
      id: this.trainerCard.id,
      purchaseDate: this.trainerCard.purchaseDate,
      expirationDate: this.trainerPrice.unlimitedValidityPeriod
        ? this.trainerCard.purchaseDate
        : null,
      trainerId: this.data.trainerId,
      userId: this.data.userId,
      name: this.trainerCard.name,
      unlimitedEntries: this.trainerPrice.unlimitedEntries,
      unlimitedValidityPeriod: this.trainerPrice.unlimitedValidityPeriod,
      validityPeriod: this.trainerPrice.validityPeriod,
      entries: this.trainerPrice.entries,
      price: this.trainerPrice.price,
      userName: this.user.firstName + ' ' + this.user.lastName,
      trainerName:
        this.trainer.user.firstName + ' ' + this.trainer.user.lastName,
      entriesLeft: this.trainerPrice.entries
    };
    this.cardService.updateTrainerCard(this.trainerCardUpdate).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }

  deleteCard() {
    this.cardService.deleteTrainerCard(this.trainerCard.id).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }

  doAction() {
    if (this.action === 'Add') {
      this.addCard();
    } else if (this.action === 'Edit') {
      this.editCard();
    } else if (this.action === 'Delete') {
      this.deleteCard();
    } else {
      this.deactivateCard();
    }
  }

  deactivateCard() {
    this.trainerPrice = this.trainerPriceList.find(
      c => c.name === this.trainerCard.name
    );

    this.trainerCardUpdate = {
      id: this.trainerCard.id,
      purchaseDate: this.trainerCard.purchaseDate,
      expirationDate: null,
      trainerId: this.data.trainerId,
      userId: this.data.userId,
      name: this.trainerCard.name,
      unlimitedEntries: this.trainerPrice.unlimitedEntries,
      unlimitedValidityPeriod: this.trainerPrice.unlimitedValidityPeriod,
      validityPeriod: this.trainerPrice.validityPeriod,
      entries: this.trainerPrice.entries,
      price: this.trainerPrice.price,
      userName: this.user.firstName + ' ' + this.user.lastName,
      trainerName:
        this.trainer.user.firstName + ' ' + this.trainer.user.lastName,
      entriesLeft: this.trainerPrice.entries
    };
    this.cardService
      .updateTrainerCard(this.trainerCardUpdate, true)
      .subscribe(() => {
        this.closeDialog();
        window.location.reload();
      });
  }
}
