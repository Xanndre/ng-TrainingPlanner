import { User } from '../User/User';
import { TrainerSportGet } from '../TrainerStuff/TrainerSportGet';

export class TrainerGetBase {
  id: number;
  user: User;
  phoneNumber: string;
  sports: TrainerSportGet[];
  isFavourite: boolean;
}
