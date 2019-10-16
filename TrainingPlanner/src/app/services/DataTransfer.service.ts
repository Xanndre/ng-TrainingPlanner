import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private trainerId: number;

  constructor() {}

  getTrainerId(): number {
    return this.trainerId;
  }

  setTrainerId(trainerId: number) {
    this.trainerId = trainerId;
  }
}
