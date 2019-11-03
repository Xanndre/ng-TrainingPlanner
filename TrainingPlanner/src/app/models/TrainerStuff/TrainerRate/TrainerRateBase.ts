import { Rate } from '../../Stuff/Rate';
import { User } from '../../User/User';

export class TrainerRateBase extends Rate {
  id: number;
  user: User;
  trainerId: number;
}
