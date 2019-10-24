import { ClubWorkingHours } from './ClubWorkingHours';

export class ClubGet {
  id: number;
  name: string;
  description: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  workingHours: ClubWorkingHours[];
}
