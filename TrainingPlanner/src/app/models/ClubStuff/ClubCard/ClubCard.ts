import { ClubCardBase } from './ClubCardBase';

export class ClubCard extends ClubCardBase {
  validityPeriod: number;
  entries: number;
  price: number;
  purchaseDate: Date;
  entriesLeft: number;
  unlimitedValidityPeriod: boolean;
  unlimitedEntries: boolean;
}
