import { TrainerCardBase } from './TrainerCardBase';

export class TrainerCard extends TrainerCardBase {
  validityPeriod: string;
  entries: string;
  price: number;
  purchaseDate: Date;
  entriesLeft: string;
}
