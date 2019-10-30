import { ClubPrice } from '../ClubStuff/ClubPrice';
import { ClubWorkingHours } from '../ClubStuff/ClubWorkingHours';
import { ClubActivity } from '../ClubStuff/ClubActivity';
import { ClubTrainer } from '../ClubStuff/ClubTrainer';
import { Picture } from '../Stuff/Picture';

export class ClubCreate {
  userId: string;
  name: string;
  description: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  priceList: ClubPrice[];
  workingHours: ClubWorkingHours[];
  trainers: ClubTrainer[];
  activities: ClubActivity[];
  pictures: Picture[];
}
