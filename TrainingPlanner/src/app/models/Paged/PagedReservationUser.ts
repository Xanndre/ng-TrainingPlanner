import { ReservationUser } from '../User/ReservationUser';
import { Paged } from './Paged';
import { Training } from '../Training/Training';

export class PagedReservationUser extends Paged {
  users: ReservationUser[];
  training: Training;
}
