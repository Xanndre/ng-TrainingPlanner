import { ClubWorkingHours } from './ClubWorkingHours';
import { Picture } from './Picture';
import { ClubPrice } from './ClubPrice';
import { ClubActivity } from './ClubActivity';
import { ClubTrainer } from './ClubTrainer';
import { User } from './User';

export class ClubGet {
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
