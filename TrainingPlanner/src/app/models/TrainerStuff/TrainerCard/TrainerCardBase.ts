import { User } from '../../User/User';

export class TrainerCardBase {
  id: number;
  trainerName: string;
  name: string;
  expirationDate: Date;
  user: User;
}
