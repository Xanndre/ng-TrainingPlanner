import { Paged } from './Paged';
import { Message } from '../Chat/Message';

export class PagedMessages extends Paged {
  messages: Message[];
  currentPage: number;
}
