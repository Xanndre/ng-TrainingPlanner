import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private isDeleteActivity: boolean;
  private isDeleteTrainer: boolean;

  constructor() {}

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
}
