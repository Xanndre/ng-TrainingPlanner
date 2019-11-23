import { Picture } from '../Stuff/Picture';
import { User } from '../User/User';

export class ClubBase {
  id: number;
  user: User;
  name: string;
  city: string;
  phoneNumber: string;
  email: string;
  picture: Picture;
  isFavourite: boolean;
}
