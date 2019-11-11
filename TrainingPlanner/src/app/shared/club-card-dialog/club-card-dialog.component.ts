import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User/User';
import { ClubCard } from 'src/app/models/ClubStuff/ClubCard/ClubCard';
import { ClubCardUpdate } from 'src/app/models/ClubStuff/ClubCard/ClubCardUpdate';
import { ClubCardCreate } from 'src/app/models/ClubStuff/ClubCard/ClubCardCreate';
import { ClubPrice } from 'src/app/models/ClubStuff/ClubPrice';
import { Club } from 'src/app/models/Club/Club';
import { ClubService } from 'src/app/services/Club.service';
import { UserService } from 'src/app/services/User.service';
import { CardService } from 'src/app/services/Card.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-club-card-dialog',
  templateUrl: './club-card-dialog.component.html',
  styleUrls: ['./club-card-dialog.component.css']
})
export class ClubCardDialogComponent implements OnInit {
  clubPriceList: ClubPrice[];
  clubPrice: ClubPrice;
  club: Club;
  user: User;
  isLoaded: boolean;
  clubCardCreate: ClubCardCreate;
  clubCardUpdate: ClubCardUpdate;

  action: string;
  clubCard: ClubCard;

  constructor(
    private clubService: ClubService,
    private userService: UserService,
    private cardService: CardService,
    private dialogRef: MatDialogRef<ClubCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<any> {
    this.action = this.data.action;
    if (this.data.id) {
      this.cardService.getClubCard(this.data.id).subscribe(async response => {
        this.clubCard = response;
        await this.getClub();
        await this.getUser();
        this.isLoaded = true;
      });
    } else {
      this.clubCard = new ClubCard();
      await this.getClub();
      await this.getUser();
      this.isLoaded = true;
    }
  }

  addCard() {
    this.clubPrice = this.clubPriceList.find(
      c => c.name === this.clubCard.name
    );

    this.clubCardCreate = {
      clubId: this.data.clubId,
      userId: this.data.userId,
      name: this.clubCard.name,
      unlimitedEntries: this.clubPrice.unlimitedEntries,
      unlimitedValidityPeriod: this.clubPrice.unlimitedValidityPeriod,
      validityPeriod: this.clubPrice.validityPeriod,
      entries: this.clubPrice.entries,
      price: this.clubPrice.price,
      userName: this.user.firstName + ' ' + this.user.lastName,
      clubName: this.club.name,
      entriesLeft: this.clubPrice.entries
    };
    this.cardService.createClubCard(this.clubCardCreate).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }

  async getClub() {
    const club = await this.clubService.getClub(this.data.clubId).toPromise();
    this.club = club;
    this.clubPriceList = club.priceList;
    this.clubPriceList.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getUser() {
    const user = await this.userService.getUser(this.data.userId).toPromise();
    this.user = user;
  }

  editCard() {
    this.clubPrice = this.clubPriceList.find(
      c => c.name === this.clubCard.name
    );
    this.clubCardUpdate = {
      id: this.clubCard.id,
      purchaseDate: this.clubCard.purchaseDate,
      expirationDate: null,
      clubId: this.data.clubId,
      userId: this.data.userId,
      name: this.clubCard.name,
      unlimitedEntries: this.clubPrice.unlimitedEntries,
      unlimitedValidityPeriod: this.clubPrice.unlimitedValidityPeriod,
      validityPeriod: this.clubPrice.validityPeriod,
      entries: this.clubPrice.entries,
      price: this.clubPrice.price,
      userName: this.user.firstName + ' ' + this.user.lastName,
      clubName: this.club.name,
      entriesLeft: this.clubPrice.entries
    };
    this.cardService.updateClubCard(this.clubCardUpdate).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }

  deleteCard() {
    this.cardService.deleteClubCard(this.clubCard.id).subscribe(() => {
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
    this.clubPrice = this.clubPriceList.find(
      c => c.name === this.clubCard.name
    );

    this.clubCardUpdate = {
      id: this.clubCard.id,
      purchaseDate: this.clubCard.purchaseDate,
      expirationDate: null,
      clubId: this.data.clubId,
      userId: this.data.userId,
      name: this.clubCard.name,
      unlimitedEntries: this.clubPrice.unlimitedEntries,
      unlimitedValidityPeriod: this.clubPrice.unlimitedValidityPeriod,
      validityPeriod: this.clubPrice.validityPeriod,
      entries: this.clubPrice.entries,
      price: this.clubPrice.price,
      userName: this.user.firstName + ' ' + this.user.lastName,
      clubName: this.club.name,
      entriesLeft: this.clubPrice.entries
    };
    this.cardService.updateClubCard(this.clubCardUpdate, true).subscribe(() => {
      this.closeDialog();
      window.location.reload();
    });
  }
}
