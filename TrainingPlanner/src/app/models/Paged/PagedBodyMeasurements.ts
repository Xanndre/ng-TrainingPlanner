import { BodyMeasurementBase } from '../BodyMeasurement/BodyMeasurementBase';
import { Paged } from './Paged';

export class PagedBodyMeasurements extends Paged {
  bodyMeasurements: BodyMeasurementBase[];
}
