export class Exercise {
  id: number;
  userTrainingId: number;
  name: string;
  series: number;
  repetitions?: number;
  duration?: number;
  isTimeRelated: boolean;
}
