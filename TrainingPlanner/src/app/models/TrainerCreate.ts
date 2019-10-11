import { TrainerSport } from './TrainerSport';

export class TrainerCreate {
  userId: string;
  description: string;
  sports: TrainerSport[];
}
