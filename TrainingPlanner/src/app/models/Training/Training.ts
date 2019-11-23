import { TrainerBase } from '../Trainer/TrainerBase';
import { ClubBase } from '../Club/ClubBase';
import { TrainingUpdate } from './TrainingUpdate';

export class Training extends TrainingUpdate {
  startTime: string;
  endTime: string;
  trainer: TrainerBase;
  club: ClubBase;
  entriesLeft: number;
}
