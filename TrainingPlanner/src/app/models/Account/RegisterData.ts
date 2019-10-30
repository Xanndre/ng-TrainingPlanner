import { LoginData } from './LoginData';

export class RegisterData extends LoginData {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  city: string;
}
