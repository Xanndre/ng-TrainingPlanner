import { TrainerCardCreate } from './TrainerCardCreate';

export class TrainerCardUpdate extends TrainerCardCreate {
  id: number;
  purchaseDate: Date;
  expirationDate: Date;
}
