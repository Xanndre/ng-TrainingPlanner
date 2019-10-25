import { User } from './User';
import { TrainerSportGet } from './TrainerSportGet';

export class TrainerGetBase {
  id: number;
  user: User;
  phoneNumber: string;
  sports: TrainerSportGet[];
  isFavourite: boolean;
}
