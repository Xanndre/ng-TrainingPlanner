import { ClubCardCreate } from './ClubCardCreate';

export class ClubCardUpdate extends ClubCardCreate {
  id: number;
  purchaseDate: Date;
  expirationDate?: Date;
}
