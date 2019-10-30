import { User } from '../User/User';
import { TrainerSportBase } from '../TrainerStuff/TrainerSportBase';

export class TrainerBase {
  id: number;
  user: User;
  phoneNumber: string;
  sports: TrainerSportBase[];
  isFavourite: boolean;
}
