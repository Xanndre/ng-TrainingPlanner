import { Paged } from './Paged';
import { UserTrainingBase } from '../UserStuff/UserTraining/UserTrainingBase';

export class PagedUserTrainings extends Paged {
  userTrainings: UserTrainingBase[];
}
