import { TrainerSport } from './TrainerSport';
import { TrainerPrice } from './TrainerPrice';

export class TrainerCreate {
  userId: string;
  description: string;
  phoneNumber: string;
  sports: TrainerSport[];
  priceList: TrainerPrice[];
}
