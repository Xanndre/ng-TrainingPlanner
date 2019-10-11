import { User } from './User';
import { TrainerSport } from './TrainerSport';

export class Trainer {
  id: number;
  user: User;
  description: string;
  sports: TrainerSport[];
}
