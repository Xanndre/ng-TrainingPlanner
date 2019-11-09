import { TrainerCardBase } from './TrainerCardBase';

export class TrainerCard extends TrainerCardBase {
  validityPeriod: number;
  entries: number;
  price: number;
  purchaseDate: Date;
  entriesLeft: number;
  unlimitedValidityPeriod: boolean;
  unlimitedEntries: boolean;
}
