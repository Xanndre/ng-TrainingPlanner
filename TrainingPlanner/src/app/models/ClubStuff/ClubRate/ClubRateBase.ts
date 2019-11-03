import { Rate } from '../../Stuff/Rate';
import { User } from '../../User/User';

export class ClubRateBase extends Rate {
  id: number;
  user: User;
  clubId: number;
}
