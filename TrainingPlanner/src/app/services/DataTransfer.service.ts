import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private trainerId: number;
  private clubId: number;
  private isDeleteActivity: boolean;
  private isDeleteTrainer: boolean;

  constructor() {}

  getTrainerId(): number {
    return this.trainerId;
  }

  setTrainerId(trainerId: number) {
    this.trainerId = trainerId;
  }

  getIsDeleteActivity(): boolean {
    return this.isDeleteActivity;
  }

  setIsDeleteActivity(isDeleteActivity: boolean) {
    this.isDeleteActivity = isDeleteActivity;
  }

  getIsDeleteTrainer(): boolean {
    return this.isDeleteTrainer;
  }

  setIsDeleteTrainer(isDeleteTrainer: boolean) {
    this.isDeleteTrainer = isDeleteTrainer;
  }

  getClubId(): number {
    return this.clubId;
  }

  setClubId(clubId: number) {
    this.clubId = clubId;
  }
}
