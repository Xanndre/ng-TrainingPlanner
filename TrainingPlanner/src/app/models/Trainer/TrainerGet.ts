import { User } from '../User/User';
import { TrainerSportGet } from '../TrainerStuff/TrainerSportGet';
import { TrainerPrice } from '../TrainerStuff/TrainerPrice';

export class TrainerGet {
  id: number;
  user: User;
  description: string;
  phoneNumber: string;
  sports: TrainerSportGet[];
  priceList: TrainerPrice[];
}
