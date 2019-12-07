import { Exercise } from './Exercise';

export class UserTrainingCreate {
  name: string;
  type: string;
  picture: string;
  userId: string;
  exercises: Exercise[];
}
