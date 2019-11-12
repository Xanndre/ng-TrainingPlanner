import { User } from '../User/User';
import { TrainerPrice } from '../TrainerStuff/TrainerPrice';
import { TrainerSport } from '../TrainerStuff/TrainerSport';

export class Trainer {
  id: number;
  user: User;
  description: string;
  phoneNumber: string;
  sports: TrainerSport[];
  priceList: TrainerPrice[];
  viewCounter: number;
  average: number;
}
