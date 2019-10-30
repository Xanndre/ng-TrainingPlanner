import { ClubWorkingHours } from '../ClubStuff/ClubWorkingHours';
import { Picture } from '../Stuff/Picture';
import { ClubPrice } from '../ClubStuff/ClubPrice';
import { ClubActivity } from '../ClubStuff/ClubActivity';
import { ClubTrainer } from '../ClubStuff/ClubTrainer';
import { User } from '../User/User';

export class Club {
  id: number;
  user: User;
  name: string;
  description: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  workingHours: ClubWorkingHours[];
  pictures: Picture[];
  priceList: ClubPrice[];
  activities: ClubActivity[];
  trainers: ClubTrainer[];
}
