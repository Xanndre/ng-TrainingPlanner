import { UserTrainingBase } from './UserTrainingBase';
import { Exercise } from './Exercise';

export class UserTraining extends UserTrainingBase {
  userId: string;
  exercises: Exercise[];
}
