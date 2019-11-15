import { BodyMeasurementBase } from './BodyMeasurementBase';
import { BodyInjury } from './BodyInjury';

export class BodyMeasurement extends BodyMeasurementBase {
  age: number;
  muscleMass: number;
  height: number;
  metabolicAge: number;
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
