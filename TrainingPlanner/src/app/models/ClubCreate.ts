import { ClubPrice } from './ClubPrice';
import { ClubWorkingHours } from './ClubWorkingHours';
import { ClubActivity } from './ClubActivity';
import { ClubTrainer } from './ClubTrainer';
import { Picture } from './Picture';

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
