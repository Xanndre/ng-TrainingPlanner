import { UserCalendarTrainingUpdate } from './UserCalendarTrainingUpdate';
import { UserTraining } from '../UserTraining/UserTraining';

export class UserCalendarTraining extends UserCalendarTrainingUpdate {
  startTime: string;
  endTime: string;
  userTraining: UserTraining;
}
