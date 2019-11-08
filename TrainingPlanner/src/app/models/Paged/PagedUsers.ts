import { Paged } from './Paged';
import { User } from '../User/User';

export class PagedUsers extends Paged {
  users: User[];
}
