import { User } from '../../User/User';

export class ClubCardBase {
  id: number;
  clubName: string;
  name: string;
  expirationDate: Date;
  user: User;
}
