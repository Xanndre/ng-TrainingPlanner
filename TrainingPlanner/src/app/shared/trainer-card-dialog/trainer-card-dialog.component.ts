import { Component, OnInit, Inject } from '@angular/core';
import { TrainerPrice } from 'src/app/models/TrainerStuff/TrainerPrice';
import { Trainer } from 'src/app/models/Trainer/Trainer';
import { User } from 'src/app/models/User/User';
import { TrainerCardCreate } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardCreate';
import { TrainerCardUpdate } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCardUpdate';
import { TrainerCard } from 'src/app/models/TrainerStuff/TrainerCard/TrainerCard';
import { TrainerService } from 'src/app/services/Trainer.service';
import { UserService } from 'src/app/services/User.service';
import { CardService } from 'src/app/services/Card.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-trainer-card-dialog',
  templateUrl: './trainer-card-dialog.component.html',
  styleUrls: ['./trainer-card-dialog.component.css']
})
export class TrainerCardDialogComponent implements OnInit {
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
    private userService: UserService,
    private cardService: CardService,
    private dialogRef: MatDialogRef<TrainerCardDialogComponent>,
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
    this.trainerPriceList.sort((a, b) => a.name.localeCompare(b.name));
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
