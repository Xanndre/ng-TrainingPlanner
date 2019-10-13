import { TrainerSport } from './TrainerSport';
import { TrainerPrice } from './TrainerPrice';

export class TrainerCreate {
  userId: string;
  description: string;
  sports: TrainerSport[];
  priceList: TrainerPrice[];
}
