import { User } from '../User/User';
import { TrainerSport } from '../TrainerStuff/TrainerSport';

export class TrainerBase {
  id: number;
  user: User;
  phoneNumber: string;
  sports: TrainerSport[];
  isFavourite: boolean;
}
