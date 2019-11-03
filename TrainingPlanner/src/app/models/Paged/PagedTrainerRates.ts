import { Paged } from './Paged';
import { TrainerRateBase } from '../TrainerStuff/TrainerRate/TrainerRateBase';

export class PagedTrainerRates extends Paged {
  rates: TrainerRateBase[];
}
