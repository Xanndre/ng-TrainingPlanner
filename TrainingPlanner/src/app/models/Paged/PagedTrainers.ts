import { TrainerBase } from '../Trainer/TrainerBase';
import { Paged } from './Paged';

export class PagedTrainers extends Paged {
  trainers: TrainerBase[];
}
