import { BodyInjury } from './BodyInjury';

export class BodyMeasurementCreate {
  userId: string;
  date: Date;
  age: number;
  muscleMass: number;
  weight: number;
  height: number;
  metabolicAge: number;
  fat: number;
  fatMass: number;
  isInjured: boolean;
  neck?: number;
  forearm?: number;
  chest?: number;
  waist?: number;
  thigh?: number;
  shoulders?: number;
  biceps?: number;
  hips?: number;
  calf?: number;
  injuries: BodyInjury[];
}
