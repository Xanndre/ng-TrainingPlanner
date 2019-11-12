import { UserLocation } from '../UserStuff/UserLocation';
import { UserSport } from '../UserStuff/UserSport';

export class Partner {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  profilePicture: string;
  locations: UserLocation[];
  sports: UserSport[];
}
