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
  entriesLeft: number;
  primaryColor: string;
  secondaryColor: string;
  startTime: string;
  endTime: string;
}
