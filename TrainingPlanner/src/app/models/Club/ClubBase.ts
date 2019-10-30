import { Picture } from '../Stuff/Picture';

export class ClubBase {
  id: number;
  name: string;
  city: string;
  phoneNumber: string;
  email: string;
  picture: Picture;
  isFavourite: boolean;
}
