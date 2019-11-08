import { ClubCardBase } from './ClubCardBase';

export class ClubCard extends ClubCardBase {
  validityPeriod: string;
  entries: string;
  price: number;
  purchaseDate: Date;
  entriesLeft: string;
}
