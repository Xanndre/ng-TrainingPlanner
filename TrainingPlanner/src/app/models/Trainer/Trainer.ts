import { User } from '../User/User';
import { TrainerSportBase } from '../TrainerStuff/TrainerSportBase';
import { TrainerPrice } from '../TrainerStuff/TrainerPrice';

export class Trainer {
  id: number;
  user: User;
  description: string;
  phoneNumber: string;
  sports: TrainerSportBase[];
  priceList: TrainerPrice[];
}
