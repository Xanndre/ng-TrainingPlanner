import { User } from './User';
import { TrainerSportGet } from './TrainerSportGet';
import { TrainerPrice } from './TrainerPrice';

export class TrainerGet {
  id: number;
  user: User;
  description: string;
  sports: TrainerSportGet[];
  priceList: TrainerPrice[];
}
