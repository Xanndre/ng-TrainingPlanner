import { UserLocation } from '../UserStuff/UserLocation';
import { UserSport } from '../UserStuff/UserSport';
import { BodyMeasurement } from '../BodyMeasurement/BodyMeasurement';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  email: string;
  city: string;
  profilePicture: string;
  locations: UserLocation[];
  sports: UserSport[];
  bodyMeasurements: BodyMeasurement[];
}
