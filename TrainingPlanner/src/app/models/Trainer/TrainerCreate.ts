import { TrainerSport } from '../TrainerStuff/TrainerSport';
import { TrainerPrice } from '../TrainerStuff/TrainerPrice';

export class TrainerCreate {
  userId: string;
  description: string;
  phoneNumber: string;
  sports: TrainerSport[];
  priceList: TrainerPrice[];
}
