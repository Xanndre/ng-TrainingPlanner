import { User } from './User';
import { TrainerSport } from './TrainerSport';
import { TrainerPrice } from './TrainerPrice';

export class Trainer {
  id: number;
  user: User;
  description: string;
  phoneNumber: string;
  sports: TrainerSport[];
  priceList: TrainerPrice[];
}
