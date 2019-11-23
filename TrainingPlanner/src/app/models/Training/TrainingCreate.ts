export class TrainingCreate {
  title: string;
  clubId?: number;
  trainerId?: number;
  startDate: Date;
  endDate: Date;
  trainerName: string;
  room: string;
  level: string;
  entries: number;
  primaryColor: string;
  secondaryColor: string;
}
